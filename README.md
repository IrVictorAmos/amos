# amos — Portfolio de Victor Amos

Portfolio d'ingénieur logiciel construit avec **Angular 22** (composants standalone, signals, zoneless), déployé sur Vercel : <https://amos12.vercel.app>.

## Démarrer

```bash
npm install
npm start        # http://localhost:4200
npm run build    # build de production dans dist/amos/browser
```

## Modifier le contenu

Tout le texte du site (profil, couches d'expertise, projets, méthode) est dans un seul fichier :

```
src/app/data/portfolio.data.ts
```

Ajouter un projet = ajouter une entrée dans `PROJECTS` (sa page `/projets/<slug>` est générée automatiquement). Pour lui donner une mini-maquette animée, ajouter un `@case` dans `src/app/components/project-visual.ts`.

## Envoi d'e-mails (formulaire de contact et réservation de démo)

Les formulaires appellent la fonction serverless `api/send.mjs` (Vercel), qui envoie par SMTP avec Nodemailer.
À configurer dans **Vercel → Settings → Environment Variables**, puis redéployer :

| Variable    | Exemple                    | Rôle                                                         |
| ----------- | -------------------------- | ------------------------------------------------------------ |
| `SMTP_HOST` | `smtp.gmail.com`           | serveur SMTP                                                 |
| `SMTP_PORT` | `465`                      | 465 (SSL) ou 587 (STARTTLS)                                  |
| `SMTP_USER` | `irvictoramos@gmail.com`   | identifiant                                                  |
| `SMTP_PASS` | mot de passe d'application | pour Gmail : compte Google → Sécurité → Mots de passe d'application |
| `MAIL_TO`   | `irvictoramos@gmail.com`   | destinataire (facultatif)                                    |
| `MAIL_FROM` | `irvictoramos@gmail.com`   | expéditeur (facultatif, par défaut `SMTP_USER`)              |

Protection : validation côté serveur, piège à robots, limite de 5 envois par IP et par 10 minutes.

## Structure

```
api/send.mjs                    # fonction serverless SMTP
src/app/
├── data/portfolio.data.ts      # contenu
├── layout/                     # en-tête (menu plein écran mobile), pied de page
├── sections/                   # hero, manifeste, réalisations, expertise (vue éclatée), méthode, contact
├── pages/                      # accueil, page projet (/projets/:slug)
├── components/                 # maquettes animées des projets, formulaire
└── shared/                     # directives d'animation au scroll
src/styles.scss                 # tokens (couleurs OKLCH, typo, espacements, mouvement)
```

Transitions entre pages : View Transitions API (`withViewTransitions`). Animations désactivées si `prefers-reduced-motion`.
