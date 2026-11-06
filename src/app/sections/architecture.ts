import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { TRACE, type NodeId } from '../data/portfolio.data';

interface GraphNode {
  id: NodeId;
  label: string;
  x: number;
  y: number;
}

/** Ordre de passage de la requête dans le système. */
const PATH: NodeId[] = ['client', 'ui', 'api', 'domain', 'data'];

const LABELS: Record<NodeId, string> = {
  client: 'Utilisateur',
  ui: 'Interface',
  api: 'API',
  domain: 'Métier',
  data: 'Données',
  ai: 'IA',
};

/** Disposition verticale (bureau) et horizontale (téléphone) du même schéma. */
const LAYOUTS = {
  v: { w: 420, h: 400, pos: { client: [210, 30], ui: [210, 115], api: [210, 200], domain: [210, 285], data: [210, 370], ai: [60, 200] } },
  h: { w: 360, h: 150, pos: { client: [26, 46], ui: [102, 46], api: [178, 46], domain: [254, 46], data: [330, 46], ai: [178, 122] } },
} as const;

/**
 * Une requête réelle suivie à travers le système, pilotée par le défilement.
 * Schéma animé + cascade de trace (comme dans un outil d'observabilité).
 */
@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.html',
  styleUrl: './architecture.scss',
})
export class Architecture {
  protected readonly steps = TRACE;
  protected readonly total = Math.max(...TRACE.map((s) => s.start + s.ms));
  /** étape active : 0..3 = couches, 4 = IA */
  protected readonly active = signal(0);
  protected readonly isAi = computed(() => this.steps[this.active()].node === 'ai');

  protected readonly layouts = (['v', 'h'] as const).map((k) => {
    const l = LAYOUTS[k];
    const nodes: GraphNode[] = (Object.keys(l.pos) as NodeId[]).map((id) => ({
      id,
      label: LABELS[id],
      x: l.pos[id][0],
      y: l.pos[id][1],
    }));
    const main = PATH.map((id) => l.pos[id]);
    const mainD = 'M' + main.map(([x, y]) => `${x} ${y}`).join(' L');
    const mainLen = main.slice(1).reduce((acc, [x, y], i) => acc + Math.hypot(x - main[i][0], y - main[i][1]), 0);
    // liens de l'IA vers chaque couche (courbes)
    const [ax, ay] = l.pos.ai;
    const aiLinks = (['ui', 'api', 'domain', 'data'] as NodeId[]).map((id) => {
      const [x, y] = l.pos[id];
      return k === 'v'
        ? `M${ax + 18} ${ay} C ${ax + 80} ${ay}, ${x - 80} ${y}, ${x - 16} ${y}`
        : `M${ax} ${ay - 16} C ${ax} ${ay - 40}, ${x} ${y + 50}, ${x} ${y + 16}`;
    });
    return { key: k, w: l.w, h: l.h, nodes, mainD, mainLen, aiLinks, pos: l.pos };
  });

  private readonly blocks = viewChildren<ElementRef<HTMLElement>>('block');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) this.active.set(Number((e.target as HTMLElement).dataset['index']));
          }
        },
        { rootMargin: '-52% 0px -38% 0px' },
      );
      for (const b of this.blocks()) observer.observe(b.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /** index de passage d'un nœud sur le chemin principal (client = 0) */
  protected order(id: NodeId): number {
    return PATH.indexOf(id);
  }

  /** position du paquet : le nœud de l'étape active (ou la base de données pour l'IA) */
  protected packet(layout: (typeof this.layouts)[number]): string {
    const node = this.isAi() ? 'data' : this.steps[this.active()].node;
    const [x, y] = layout.pos[node];
    return `translate(${x}px, ${y}px)`;
  }

  /** portion du chemin principal parcourue */
  protected traveled(layout: (typeof this.layouts)[number]): number {
    const reached = this.isAi() ? 4 : this.order(this.steps[this.active()].node);
    return layout.mainLen * (1 - reached / (PATH.length - 1));
  }

  protected nodeState(id: NodeId): 'active' | 'done' | 'idle' {
    const step = this.steps[this.active()];
    if (id === step.node) return 'active';
    if (this.isAi()) return id === 'client' ? 'idle' : 'done';
    if (id !== 'ai' && this.order(id) < this.order(step.node)) return 'done';
    return 'idle';
  }
}
