/**
 * Contenu du portfolio. Tout le texte du site vient de ce fichier.
 * Règle : tout ce qui est affiché doit être vrai et vérifiable.
 */

export type StatusTone = 'ok' | 'progress' | 'dev';

export interface Project {
  slug: string;
  name: string;
  kind: string;
  year: string;
  status: string;
  tone: StatusTone;
  summary: string;
  context: string;
  built: string[];
  decisions: { title: string; text: string }[];
  stack: string[];
  role: string;
  url?: string;
  urlLabel?: string;
  demo?: boolean;
}

export interface Layer {
  id: string;
  name: string;
  title: string;
  text: string;
  tools: string[];
}

export const PROFILE = {
  firstName: 'Victor',
  lastName: 'Amos',
  email: 'irvictoramos@gmail.com',
  city: 'Bukavu, RDC',
  timeZone: 'Africa/Lubumbashi',
  available: 'Disponible pour de nouvelles missions',
  intro:
    "Ingénieur développeur web et mobile, en master d'architecture logicielle. Je conçois des systèmes complets, du modèle de données à l'interface, avec l'IA intégrée à chaque étape de mon travail.",
  facts: [
    { label: 'Métier', value: 'Ingénieur développeur web et mobile' },
    { label: 'Formation', value: 'Master en architecture logicielle, en cours' },
    { label: 'Méthode', value: "IA intégrée au workflow, prompt engineering" },
    { label: 'Base', value: 'Bukavu, RDC. Missions à distance partout' },
  ],
  manifesto:
    "Un logiciel se construit comme un bâtiment. On pose les fondations avant la façade, on dessine les plans avant de couler le béton, et on pense à ceux qui l'habiteront dans dix ans. C'est ce que j'apporte à chaque projet : une architecture claire, un code qui se relit, et une interface qui donne envie de revenir.",
  socials: [
    { label: 'GitHub', url: 'https://github.com/IrVictorAmos' },
    { label: 'LinkedIn', url: '' },
  ],
};

/** Les couches de la « vue éclatée ». L'IA est traitée à part : elle les traverse toutes. */
export const LAYERS: Layer[] = [
  {
    id: 'experience',
    name: 'Expérience',
    title: 'Des interfaces web et mobiles rapides, lisibles, accessibles',
    text: "Je pars de l'utilisateur réel : un préfet sur un téléphone d'entrée de gamme, un client pressé, un soignant entre deux patients. Mobile d'abord, hors ligne quand le réseau ne suit pas.",
    tools: ['Angular', 'TypeScript', 'Flutter', 'Stimulus et Turbo', 'PWA'],
  },
  {
    id: 'metier',
    name: 'Métier',
    title: 'Un domaine modélisé avant d’être codé',
    text: "Les règles métier vivent dans un cœur indépendant du framework. Chaque exigence porte une référence, chaque cas d'usage a ses tests.",
    tools: ['Architecture hexagonale', 'Domain-Driven Design', 'Symfony', 'PHP 8'],
  },
  {
    id: 'api',
    name: 'Services et API',
    title: 'Des contrats clairs entre les briques',
    text: 'API REST documentées, authentification par jetons, rôles et double authentification. Le front et le back évoluent sans se casser mutuellement.',
    tools: ['API Platform', 'REST', 'JWT', 'Messenger', 'Mercure'],
  },
  {
    id: 'donnees',
    name: 'Données et infra',
    title: 'Des fondations prévues pour durer',
    text: 'Schémas versionnés, environnements identiques du poste de développement à la production, déploiement reproductible et mesuré.',
    tools: ['PostgreSQL', 'MySQL', 'Docker', 'FrankenPHP', 'CI et Lighthouse'],
  },
];

export const AI_LAYER = {
  name: 'IA',
  title: "L'IA traverse chaque couche",
  text: "Agents de code encadrés par des règles écrites, prompts conçus et versionnés comme du code, revues assistées. L'IA accélère ; l'architecture et la décision restent humaines.",
  tools: ['Claude Code', 'Prompt engineering', 'Intégration de LLM', 'Agents et outils'],
};

export const PROJECTS: Project[] = [
  {
    slug: 'schoolreflexe',
    name: 'SchoolReflexe',
    kind: 'Logiciel de gestion scolaire',
    year: '2026',
    status: 'En cours, démo sur réservation',
    tone: 'progress',
    summary:
      "Une école, un seul réflexe. La plateforme qui gère toute la vie d'une école secondaire en RDC : inscriptions, cotes, bulletins, finances et parents, même sans Internet.",
    context:
      "Dans beaucoup d'écoles de la RDC, les bulletins se calculent encore à la main, les paiements se suivent sur des cahiers et la connexion Internet tombe régulièrement. SchoolReflexe est conçu à Bukavu, pour ce terrain-là.",
    built: [
      'Bulletins et délibération générés à partir des cotes saisies',
      'Saisie des cotes par les enseignants',
      'Inscriptions et dossier complet de chaque élève',
      'Finances de l’école et paiements par mobile money',
      'Présences et discipline',
      'Communication avec les parents par SMS et portail',
      'Fonctionnement hors ligne, synchronisé au retour du réseau',
      'Site vitrine avec back-office, rôles et double authentification',
    ],
    decisions: [
      {
        title: 'Hors ligne d’abord',
        text: "Le réseau n'est pas une garantie sur le terrain : l'application reste utilisable sans connexion et se synchronise ensuite.",
      },
      {
        title: 'Exigences référencées',
        text: 'Un cahier des charges où chaque exigence a un identifiant, cité dans les commits et les tests. Rien n’est affiché comme disponible avant d’être en production.',
      },
      {
        title: 'Une pile sobre et rapide',
        text: 'Symfony 7.4 LTS sur FrankenPHP en mode worker, AssetMapper sans Node, transitions de page natives.',
      },
    ],
    stack: ['Symfony 7.4 LTS', 'PHP 8.5', 'FrankenPHP', 'PostgreSQL 16', 'Stimulus', 'Docker', 'EasyAdmin'],
    role: 'Conception produit, architecture et développement complet',
    demo: true,
  },
  {
    slug: 'beelshop',
    name: 'BeelShop',
    kind: 'Plateforme e-commerce',
    year: '2026',
    status: 'En ligne',
    tone: 'ok',
    summary:
      'Une boutique en ligne complète : catalogue avec variantes, panier, commandes, promotions, avis clients et back-office de gestion.',
    context:
      "Un commerce qui veut vendre en ligne a besoin de bien plus qu'une vitrine : stocks par variante, promotions, livraison, remboursements, suivi des commandes. BeelShop couvre toute la chaîne.",
    built: [
      'Catalogue avec marques, collections, attributs et variantes de produits',
      'Panier, commandes et historique de chaque commande',
      'Codes de réduction et ventes flash',
      'Avis clients avec signalement et modération',
      'Frais de livraison et fournisseurs logistiques',
      'Remboursements et notifications par e-mail',
      'Conversion de devises',
      'Back-office complet pour gérer la boutique',
    ],
    decisions: [
      {
        title: 'API d’abord',
        text: "Le back-end expose une API documentée avec API Platform : n'importe quel front, web ou mobile, peut s'y brancher.",
      },
      {
        title: 'Authentification par jetons',
        text: 'JWT pour les sessions clientes, vérification des adresses e-mail, journal des actions sensibles.',
      },
      {
        title: 'Back-office productif',
        text: 'EasyAdmin pour donner au commerçant la main sur tout le catalogue sans attendre un développeur.',
      },
    ],
    stack: ['Symfony 8', 'API Platform', 'Doctrine', 'JWT', 'EasyAdmin', 'MySQL'],
    role: 'Architecture et développement back-end et front-end',
    url: 'https://beelshops.gt.tc/?i=1',
    urlLabel: 'Visiter la boutique',
  },
  {
    slug: 'events',
    name: 'Events',
    kind: 'Plateforme de gestion d’événements',
    year: '2026',
    status: 'En développement',
    tone: 'dev',
    summary:
      'Une plateforme pour organiser, publier et suivre des événements, de la création jusqu’à l’accueil des participants.',
    context:
      'Organiser un événement mobilise souvent des tableurs, des messages et des listes papier. Events rassemble tout au même endroit.',
    built: [
      'Création et publication d’événements',
      'Inscription des participants',
      'Suivi des participants et contrôle à l’entrée',
    ],
    decisions: [
      {
        title: 'Pensé pour le mobile',
        text: 'Les organisateurs travaillent sur le terrain : chaque écran est conçu d’abord pour le téléphone.',
      },
    ],
    stack: ['En cours de définition'],
    role: 'Conception et développement',
  },
  {
    slug: 'gestion-hospitaliere',
    name: 'Gestion hospitalière',
    kind: 'Système d’information hospitalier',
    year: '2025',
    status: 'Réalisé',
    tone: 'ok',
    summary:
      'Un système pour gérer un établissement de santé : dossiers des patients, rendez-vous, consultations et facturation.',
    context:
      'Dans un hôpital, une information perdue coûte du temps et parfois davantage. Le système centralise le parcours du patient pour que chaque service travaille sur les mêmes données.',
    built: [
      'Dossier patient centralisé',
      'Rendez-vous et consultations',
      'Suivi des soins par service',
      'Facturation',
    ],
    decisions: [
      {
        title: 'Données sensibles',
        text: 'Accès par rôle : chaque profil ne voit que ce dont il a besoin.',
      },
    ],
    stack: ['À compléter'],
    role: 'Conception et développement',
  },
];

export const METHOD = [
  {
    title: 'Comprendre le terrain',
    text: "Ateliers avec les vrais utilisateurs, puis un cahier des charges où chaque exigence porte une référence. On sait ce qu'on construit, et pourquoi.",
  },
  {
    title: 'Dessiner l’architecture',
    text: 'Modèle du domaine, découpage en couches, choix techniques justifiés et écrits. Le plan existe avant la première ligne de code.',
  },
  {
    title: 'Construire avec l’IA',
    text: 'Des agents de code guidés par des règles de projet et des prompts soignés. Je relis, je teste, je décide : l’IA multiplie la vitesse, pas les erreurs.',
  },
  {
    title: 'Livrer et mesurer',
    text: 'Conteneurs identiques du poste à la production, intégration continue, audits de performance. Chaque exigence est suivie jusqu’à sa mise en ligne.',
  },
];
