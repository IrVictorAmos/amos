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
  /** capture réelle (dans public/images/projets), affichée à la place de la maquette */
  image?: { src: string; width: number; height: number; alt: string };
}

export type NodeId = 'client' | 'ui' | 'api' | 'domain' | 'data' | 'ai';

/** Une étape de la requête tracée dans la section « Architecture ». */
export interface TraceStep {
  node: NodeId;
  layer: string;
  title: string;
  text: string;
  tools: string[];
  span: string;
  /** début et durée en millisecondes, pour la cascade de trace */
  start: number;
  ms: number;
}

export interface Service {
  id: string;
  title: string;
  pitch: string;
  detail: string;
  deliverables: string[];
}

export const PROFILE = {
  firstName: 'Victor',
  lastName: 'Amos',
  email: 'irvictoramos@gmail.com',
  city: 'Bukavu, RDC',
  timeZone: 'Africa/Lubumbashi',
  available: 'Disponible pour de nouvelles missions',
  intro:
    "Ingénieur développeur web et mobile, en master d'architecture logicielle. Je conçois des systèmes complets, du modèle de données à l'interface, avec l'IA intégrée à mon workflow.",
  facts: [
    { label: 'Métier', value: 'Ingénieur développeur web et mobile' },
    { label: 'Formation', value: 'Master en architecture logicielle, en cours' },
    { label: 'Méthode', value: "IA intégrée au workflow, prompt engineering" },
    { label: 'Base', value: 'Bukavu, RDC. Missions à distance partout' },
  ],
  manifesto:
    "Un logiciel se construit comme un bâtiment. On pose les fondations avant la façade, on dessine les plans avant de couler le béton, et on pense à ceux qui l'habiteront dans dix ans. C'est ce que j'apporte à chaque projet : une architecture claire, un code qui se relit, et une interface qui donne envie de revenir.",
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ir-victor-amos-149954387', handle: 'Ir Victor Amos' },
    { label: 'GitHub', url: 'https://github.com/IrVictorAmos', handle: 'IrVictorAmos' },
    { label: 'Facebook', url: 'https://web.facebook.com/profile.php?id=61574333849458', handle: 'Page Facebook' },
  ],
};

/**
 * Une requête réelle (valider un bulletin dans SchoolReflexe) suivie à travers le système.
 * Les durées servent d'illustration à la cascade de trace.
 */
export const TRACE: TraceStep[] = [
  {
    node: 'ui',
    layer: 'Expérience',
    title: 'Une interface qui répond tout de suite',
    text: "Un préfet valide un bulletin sur un téléphone d'entrée de gamme, parfois sans réseau. L'interface est pensée mobile d'abord, accessible, et continue de fonctionner hors ligne.",
    tools: ['Angular', 'TypeScript', 'Flutter', 'Stimulus et Turbo', 'PWA'],
    span: 'interface.valider_bulletin',
    start: 0,
    ms: 14,
  },
  {
    node: 'api',
    layer: 'Services et API',
    title: 'Un contrat clair entre les briques',
    text: "La requête arrive sur une API documentée : jeton vérifié, rôle contrôlé, données validées. Le front et le back évoluent sans se casser mutuellement.",
    tools: ['API Platform', 'REST', 'JWT', 'Messenger', 'Mercure'],
    span: 'api.authentifier',
    start: 14,
    ms: 6,
  },
  {
    node: 'domain',
    layer: 'Métier',
    title: 'Des règles métier isolées et testées',
    text: "La délibération applique les règles de l'école dans un cœur indépendant du framework. Chaque exigence porte une référence, chaque cas d'usage a ses tests.",
    tools: ['Architecture hexagonale', 'Domain-Driven Design', 'Symfony', 'PHP 8'],
    span: 'metier.deliberer',
    start: 20,
    ms: 22,
  },
  {
    node: 'data',
    layer: 'Données et infra',
    title: 'Des fondations prévues pour durer',
    text: 'Une transaction écrit le résultat. Schémas versionnés, environnements identiques du poste à la production, déploiement reproductible et mesuré.',
    tools: ['PostgreSQL', 'MySQL', 'Docker', 'FrankenPHP', 'CI et Lighthouse'],
    span: 'sql.transaction',
    start: 42,
    ms: 9,
  },
  {
    node: 'ai',
    layer: 'IA',
    title: "Et l'IA traverse chaque couche",
    text: "Elle n'est pas une brique de plus : elle m'accompagne à chaque niveau. Agents de code encadrés par des règles écrites, prompts conçus et versionnés comme du code, revues assistées. L'IA accélère ; l'architecture et la décision restent humaines.",
    tools: ['Claude Code', 'Prompt engineering', 'Intégration de LLM', 'Agents et outils'],
    span: 'ia.assistance',
    start: 0,
    ms: 51,
  },
];

export const SERVICES: Service[] = [
  {
    id: 'applications',
    title: 'Applications web et mobiles',
    pitch: 'Votre produit conçu et construit de A à Z, jusqu’à la mise en production.',
    detail:
      'Plateformes métier, boutiques en ligne, applications mobiles Flutter, sites performants. Je pars de vos utilisateurs réels et je livre un produit maintenable, documenté et mesuré.',
    deliverables: ['Cahier des charges et maquettes', 'Application en production', 'Code source et documentation', 'Suivi après livraison'],
  },
  {
    id: 'architecture',
    title: 'Architecture logicielle',
    pitch: 'Un système qui tient la charge et qui reste facile à faire évoluer.',
    detail:
      'Conception ou refonte d’architecture, découpage en modules, choix techniques argumentés, revue de code et de dette technique. Pour repartir sur des fondations saines avant d’ajouter des fonctionnalités.',
    deliverables: ['Revue de l’existant', 'Schémas d’architecture', 'Décisions techniques écrites', 'Plan de migration'],
  },
  {
    id: 'schema-directeur',
    title: 'Schéma directeur informatique',
    pitch: 'La feuille de route de votre système d’information sur 3 à 5 ans.',
    detail:
      'État des lieux de l’existant, recueil des besoins de chaque service, vision cible, puis des projets priorisés avec budget et calendrier. Pour que chaque investissement informatique serve la stratégie de votre organisation.',
    deliverables: ['Cartographie du SI actuel', 'Besoins par métier', 'Architecture cible', 'Projets priorisés, budget et calendrier'],
  },
  {
    id: 'audit',
    title: 'Audit informatique',
    pitch: 'Savoir précisément où en est votre informatique, et quoi corriger en premier.',
    detail:
      'Audit des applications, de l’infrastructure, de la sécurité et de l’organisation. Vous recevez un rapport clair : constats, risques classés par gravité et recommandations concrètes, présentés à votre direction.',
    deliverables: ['Inventaire et constats', 'Risques classés par gravité', 'Recommandations priorisées', 'Restitution à la direction'],
  },
  {
    id: 'ia',
    title: 'IA et prompt engineering',
    pitch: 'Intégrer l’IA là où elle fait gagner du temps, sans perdre le contrôle.',
    detail:
      'Assistants intégrés à vos outils, automatisation de tâches répétitives, prompts conçus et testés, formation de vos équipes à un usage fiable de l’IA.',
    deliverables: ['Cas d’usage identifiés', 'Prototype fonctionnel', 'Prompts documentés', 'Formation des équipes'],
  },
];

/** Offre dédiée aux étudiants, mise en avant séparément. */
export const STUDENTS = {
  title: 'Étudiants en informatique : réussir votre travail de fin de cycle',
  text: "TFC, mémoire ou projet de fin d'études : je vous aide à concevoir un vrai produit, du choix du sujet à la soutenance. Je vous guide et je vous challenge ; le travail reste le vôtre, et vous saurez le défendre.",
  steps: [
    'Choisir un sujet utile et faisable',
    'Rédiger le cahier des charges',
    'Modéliser : UML, Merise, base de données',
    'Choisir l’architecture et les technologies',
    'Développer avec de bonnes pratiques',
    'Préparer la démonstration et la soutenance',
  ],
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
    kind: 'Boutique en ligne de bijoux et accessoires',
    year: '2026',
    status: 'En ligne',
    tone: 'ok',
    summary:
      'La boutique en ligne d’une bijouterie de Bukavu : colliers, chaînettes, bracelets et croix, commandés en quelques secondes et confirmés sur WhatsApp.',
    context:
      'À Bukavu, on achète en confiance : on veut voir la pièce, poser une question et payer à la livraison ou par Mobile Money. BeelShop reprend ces habitudes au lieu de les combattre : une vitrine élégante, une commande express et une confirmation humaine sur WhatsApp.',
    built: [
      'Vitrine et catalogue par catégories, avec variantes et attributs',
      'Commande en quelques secondes, confirmée sur WhatsApp',
      'Paiement à la livraison ou par Mobile Money',
      'Livraison à Bukavu en 1 à 2 jours, offerte dès 2 articles',
      'Favoris, compte client et historique des commandes',
      'Codes de réduction, ventes flash et avis clients modérés',
      'Thème clair et sombre',
      'Back-office complet : produits, stocks, commandes, remboursements',
    ],
    decisions: [
      {
        title: 'Le parcours local d’abord',
        text: 'Plutôt qu’un paiement en ligne que peu de clients utilisent, la commande se confirme sur WhatsApp et se paie à la livraison ou par Mobile Money.',
      },
      {
        title: 'API d’abord',
        text: 'Le back-end Symfony expose une API documentée avec API Platform et une authentification par jetons JWT : une application mobile pourra s’y brancher sans rien réécrire.',
      },
      {
        title: 'Autonomie du commerçant',
        text: 'Un back-office EasyAdmin donne la main sur tout le catalogue, les promotions et les commandes, sans attendre un développeur.',
      },
    ],
    stack: ['Symfony 8', 'API Platform', 'Doctrine', 'JWT', 'EasyAdmin', 'MySQL'],
    role: 'Conception, architecture et développement complet',
    url: 'https://beelshops.gt.tc/?i=1',
    urlLabel: 'Visiter la boutique',
    image: {
      src: 'images/projets/beelshop',
      width: 1920,
      height: 952,
      alt: 'Page d’accueil de BeelShop : « Boutique éclatante d’élégance et de lumière », avec des colliers et bracelets en photo',
    },
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

/** Informations du site, utilisées pour le référencement. */
export const SITE = {
  url: 'https://amos12.vercel.app',
  name: 'Victor Amos',
  title: 'Victor Amos — Ingénieur logiciel à Bukavu : architecture, web, mobile et IA',
  description:
    "Victor Amos, ingénieur développeur web et mobile à Bukavu (RDC), en master d'architecture logicielle. Applications web et mobiles, architecture logicielle, schéma directeur informatique, audit informatique, intégration de l'IA et accompagnement des étudiants.",
  image: '/images/og.jpg',
};
