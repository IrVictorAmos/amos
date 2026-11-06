/**
 * Toutes les informations affichées dans le portfolio.
 * Pour modifier le contenu du site, il suffit d'éditer ce fichier.
 */

export interface Project {
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export const PROFILE = {
  firstName: 'Victor',
  lastName: 'Amos',
  role: 'Développeur Full-Stack',
  tagline:
    "Je conçois des interfaces modernes et des applications web soignées, du design jusqu'au déploiement.",
  location: 'À compléter',
  email: 'irvictoramos@gmail.com',
  available: true,
  about: [
    "Développeur passionné par le web, j'aime transformer des idées en produits clairs, rapides et agréables à utiliser.",
    "Ce paragraphe est à personnaliser : ton parcours, ce qui te motive, le type de projets que tu recherches.",
  ],
  stats: [
    { value: '10+', label: 'Projets réalisés' },
    { value: '3+', label: "Années d'expérience" },
    { value: '∞', label: 'Curiosité' },
  ],
};

export const SKILLS: SkillGroup[] = [
  { title: 'Front-end', items: ['Angular', 'TypeScript', 'HTML / SCSS', 'React', 'Tailwind CSS'] },
  { title: 'Back-end', items: ['Node.js', 'PHP', 'API REST', 'SQL'] },
  { title: 'Outils', items: ['Git & GitHub', 'Figma', 'VS Code', 'Docker'] },
];

export const PROJECTS: Project[] = [
  {
    title: 'SchoolReflexe',
    description: 'Plateforme pour les établissements scolaires. Description à compléter.',
    tags: ['Web', 'Plateforme'],
  },
  {
    title: 'Nexora',
    description: 'Description à compléter.',
    tags: ['Web'],
    repo: 'https://github.com/IrVictorAmos/nexora',
  },
  {
    title: 'Maison Bénie',
    description: 'Application front-end et back-end. Description à compléter.',
    tags: ['Front', 'Back'],
    repo: 'https://github.com/IrVictorAmos/maisonbenie',
  },
  {
    title: 'BeelShop',
    description: 'Back-end e-commerce. Description à compléter.',
    tags: ['E-commerce', 'API'],
    repo: 'https://github.com/amosamosamos2003/beelshop_back',
  },
];

export const SOCIALS: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/IrVictorAmos' },
  { label: 'LinkedIn', url: '#' },
];
