/**
 * Fonction serverless Vercel : POST /api/send
 * Envoie les messages du formulaire de contact et les demandes de démo SchoolReflexe par SMTP.
 *
 * Variables d'environnement (Vercel > Settings > Environment Variables) :
 *   SMTP_HOST   ex. smtp.gmail.com
 *   SMTP_PORT   ex. 465 (SSL) ou 587 (STARTTLS)
 *   SMTP_USER   identifiant SMTP (adresse e-mail)
 *   SMTP_PASS   mot de passe SMTP (pour Gmail : un « mot de passe d'application »)
 *   MAIL_TO     destinataire (par défaut : irvictoramos@gmail.com)
 *   MAIL_FROM   expéditeur affiché (par défaut : SMTP_USER)
 */
import nodemailer from 'nodemailer';

const LIMITS = { name: 120, email: 160, subject: 80, phone: 40, school: 160, position: 60, city: 80, slot: 60, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map(); // limite simple par IP (au mieux, par instance)

function clean(value, max) {
  return String(value ?? '').replace(/\r/g, '').trim().slice(0, max);
}

function esc(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export function buildMail(body) {
  const type = body.type === 'demo' ? 'demo' : 'contact';
  const d = {};
  for (const [k, max] of Object.entries(LIMITS)) d[k] = clean(body[k], max);

  if (!d.name) return { error: 'Le nom est obligatoire.' };
  if (!EMAIL_RE.test(d.email)) return { error: "L'adresse e-mail n'est pas valide." };
  if (type === 'demo' && !d.school) return { error: "Le nom de l'établissement est obligatoire." };
  if (type === 'contact' && !d.message) return { error: 'Le message est obligatoire.' };

  const rows =
    type === 'demo'
      ? [
          ['Nom', d.name],
          ['E-mail', d.email],
          ['Téléphone', d.phone || '—'],
          ['Établissement', d.school],
          ['Fonction', d.position || '—'],
          ['Ville', d.city || '—'],
          ['Moment préféré', d.slot || '—'],
          ['Attentes', d.message || '—'],
        ]
      : [
          ['Nom', d.name],
          ['E-mail', d.email],
          ['Objet', d.subject || '—'],
          ['Message', d.message],
        ];

  const subject =
    type === 'demo'
      ? `[SchoolReflexe] Demande de démo : ${d.school} (${d.city || 'ville non précisée'})`
      : `[Portfolio] ${d.subject || 'Nouveau message'} : ${d.name}`;

  const text = rows.map(([k, v]) => `${k} : ${v}`).join('\n');
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px">
      <h2 style="margin:0 0 16px">${esc(type === 'demo' ? 'Nouvelle demande de démo SchoolReflexe' : 'Nouveau message depuis le portfolio')}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="color:#888;font-size:12px;margin-top:16px">Répondez directement à cet e-mail pour écrire à ${esc(d.name)}.</p>
    </div>`;

  return { subject, text, html, replyTo: { name: d.name, address: d.email } };
}

function smtpConfig() {
  const host = (process.env.SMTP_HOST || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  // les mots de passe d'application Google s'affichent avec des espaces : on les retire
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const port = Number((process.env.SMTP_PORT || '465').trim());
  return { host, user, pass, port, ok: Boolean(host && user && pass) };
}

function transport(c) {
  return nodemailer.createTransport({
    host: c.host,
    port: c.port,
    secure: c.port === 465,
    auth: { user: c.user, pass: c.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
  });
}

/** Traduit une erreur SMTP en cause compréhensible (sans jamais exposer de secret). */
function cause(err) {
  const code = err?.code || '';
  const rc = err?.responseCode || 0;
  if (code === 'EAUTH' || rc === 535 || rc === 534) return 'authentification refusée : vérifiez SMTP_USER et SMTP_PASS (mot de passe d’application Google)';
  if (code === 'ETIMEDOUT' || code === 'ECONNECTION' || code === 'ESOCKET' || code === 'ECONNREFUSED') return 'connexion impossible : vérifiez SMTP_HOST et SMTP_PORT (465 ou 587)';
  if (code === 'EENVELOPE') return 'adresse d’expédition ou de destination refusée';
  return `erreur SMTP ${code || rc || 'inconnue'}`;
}

export default async function handler(req, res) {
  // Diagnostic : GET /api/send indique si l'envoi est configuré et si la connexion SMTP fonctionne.
  if (req.method === 'GET') {
    const c = smtpConfig();
    const report = {
      configuration: {
        SMTP_HOST: c.host || 'manquant',
        SMTP_PORT: c.port,
        SMTP_USER: c.user ? c.user.replace(/^(.{2}).*(@.*)$/, '$1***$2') : 'manquant',
        SMTP_PASS: c.pass ? `défini (${c.pass.length} caractères)` : 'manquant',
        MAIL_TO: process.env.MAIL_TO || 'irvictoramos@gmail.com (par défaut)',
      },
    };
    if (!c.ok) return res.status(200).json({ ...report, smtp: 'non configuré' });
    try {
      await transport(c).verify();
      return res.status(200).json({ ...report, smtp: 'connexion et authentification OK' });
    } catch (err) {
      return res.status(200).json({ ...report, smtp: cause(err) });
    }
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};

  // piège à robots rempli : on fait semblant d'avoir réussi
  if (body.website) return res.status(200).json({ ok: true });

  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'inconnu';
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' });
  }

  const mail = buildMail(body);
  if (mail.error) return res.status(400).json({ ok: false, error: mail.error });

  const c = smtpConfig();
  if (!c.ok) {
    console.error('SMTP non configuré : définir SMTP_HOST, SMTP_USER et SMTP_PASS sur Vercel, puis redéployer.');
    return res.status(500).json({ ok: false, error: "le service d'envoi n'est pas encore configuré." });
  }

  try {
    await transport(c).sendMail({
      from: { name: 'Portfolio Victor Amos', address: (process.env.MAIL_FROM || c.user).trim() },
      to: (process.env.MAIL_TO || 'irvictoramos@gmail.com').trim(),
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Échec SMTP :', cause(err), err?.response || '');
    return res.status(502).json({ ok: false, error: 'le serveur de messagerie a refusé l’envoi.' });
  }
}
