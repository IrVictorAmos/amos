import { Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';
import { ScrollProgressDirective } from '../shared/scroll-progress.directive';

/** Expressions soulignées au fil de la lecture. */
const KEYS = [
  'les fondations',
  'les plans',
  'dans dix ans.',
  'une architecture claire,',
  'un code qui se relit,',
  'une interface qui donne envie de revenir.',
];

interface Part {
  d: string;
  a: number;
  b: number;
  cls?: string;
}

/**
 * Manifeste épinglé : pendant le défilement, le texte se révèle mot à mot
 * et un bâtiment se dessine comme sur un plan d'architecte, couche après couche,
 * jusqu'à ce que ses fenêtres s'allument. Tout est réversible en remontant.
 */
@Component({
  selector: 'app-manifesto',
  imports: [ScrollProgressDirective],
  templateUrl: './manifesto.html',
  styleUrl: './manifesto.scss',
})
export class Manifesto {
  protected readonly text = PROFILE.manifesto;
  protected readonly words = this.split();

  /** traits du bâtiment : [début, fin] de progression pour chacun */
  protected readonly parts: Part[] = [
    { d: 'M14 300 H366', a: 0.02, b: 0.1, cls: 'ground' },
    { d: 'M70 300 V336 H310 V300', a: 0.06, b: 0.16, cls: 'dash' },
    { d: 'M110 336 V358 M190 336 V358 M270 336 V358', a: 0.12, b: 0.2, cls: 'dash' },
    { d: 'M80 300 V130 M160 300 V130 M220 300 V130 M300 300 V130', a: 0.18, b: 0.32 },
    { d: 'M80 245 H300 M80 188 H300 M80 130 H300', a: 0.26, b: 0.4 },
    { d: 'M64 130 L190 60 L316 130', a: 0.38, b: 0.5, cls: 'roof' },
    { d: 'M32 300 V60 M26 300 H38 M26 60 H38', a: 0.46, b: 0.56, cls: 'dim' },
  ];

  /** fenêtres (contour puis lumière), étage par étage */
  protected readonly windows = this.buildWindows();

  /** annotations : chaque partie du bâtiment correspond à une couche logicielle */
  protected readonly notes = [
    { label: 'Architecture', y: 92, x1: 262, a: 0.5 },
    { label: 'Interface', y: 160, x1: 300, a: 0.62 },
    { label: 'Métier et API', y: 222, x1: 300, a: 0.36 },
    { label: 'Données', y: 322, x1: 310, a: 0.18 },
  ];

  private split() {
    const raw = PROFILE.manifesto.split(' ');
    const keyIdx = new Set<number>();
    for (const phrase of KEYS) {
      const kw = phrase.split(' ');
      for (let i = 0; i + kw.length <= raw.length; i++) {
        if (kw.every((w, j) => raw[i + j] === w)) {
          for (let j = 0; j < kw.length; j++) keyIdx.add(i + j);
          break;
        }
      }
    }
    return raw.map((w, i) => ({ w, key: keyIdx.has(i) }));
  }

  private buildWindows() {
    const bays = [80, 160, 220];
    const widths = [80, 60, 80];
    const levels = [130, 188, 245];
    const out: { x: number; y: number; w: number; h: number; a: number; light: number }[] = [];
    // ordre d'allumage volontairement irrégulier, comme un vrai immeuble le soir
    const order = [4, 0, 7, 2, 5, 8, 1, 6, 3];
    let k = 0;
    levels.forEach((ly) => {
      bays.forEach((bx, bi) => {
        const w = widths[bi] - 28;
        out.push({ x: bx + 14, y: ly + 14, w, h: 28, a: 0.52 + k * 0.012, light: 0.74 + order[k] * 0.022 });
        k++;
      });
    });
    return out;
  }
}
