import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  viewChildren,
} from '@angular/core';
import { AI_LAYER, LAYERS } from '../data/portfolio.data';
import { ScrollProgressDirective } from '../shared/scroll-progress.directive';

/**
 * Vue éclatée : les couches d'un logiciel s'écartent au défilement,
 * la couche décrite à droite se soulève, et l'IA les traverse toutes.
 */
@Component({
  selector: 'app-expertise',
  imports: [ScrollProgressDirective],
  templateUrl: './expertise.html',
  styleUrl: './expertise.scss',
})
export class Expertise implements AfterViewInit, OnDestroy {
  protected readonly layers = LAYERS;
  protected readonly ai = AI_LAYER;
  /** 0..3 = couches, 4 = IA */
  protected readonly active = signal(0);

  private readonly blocks = viewChildren<ElementRef<HTMLElement>>('block');
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.active.set(Number((entry.target as HTMLElement).dataset['index']));
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const block of this.blocks()) this.observer.observe(block.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
