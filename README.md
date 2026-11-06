# amos — Portfolio de Victor Amos

Portfolio personnel construit avec **Angular 22** (composants standalone, signals, sans backend ni base de données).

## Démarrer

```bash
npm install
npm start        # http://localhost:4200
npm run build    # build de production dans dist/amos/browser
```

## Modifier le contenu

Tout le texte du site (profil, compétences, projets, liens) se trouve dans un seul fichier :

```
src/app/data/portfolio.data.ts
```

## Structure

```
src/app/
├── data/portfolio.data.ts   # contenu du site
├── pages/home/              # page d'accueil (assemble les sections)
├── sections/                # header, hero, about, skills, projects, contact
└── shared/reveal.directive.ts  # animation d'apparition au scroll
src/styles.scss              # thème global (couleurs, typo, boutons, cartes)
```

Les couleurs et polices se règlent via les variables CSS en haut de `src/styles.scss`.
