import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './data/portfolio.data';

/**
 * Toutes les pages sont pré-rendues en HTML statique au build :
 * Google et les robots des IA lisent le contenu complet sans exécuter de JavaScript.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'projets/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECTS.map((p) => ({ slug: p.slug })),
  },
  { path: '**', renderMode: RenderMode.Client },
];
