import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject, input } from '@angular/core';

/**
 * Écrit la progression de l'élément dans la fenêtre dans la variable CSS --p (0 → 1).
 * 0 : le haut de l'élément atteint `start` (fraction de la hauteur de fenêtre).
 * 1 : le bas de l'élément atteint `end`.
 * Le CSS s'occupe ensuite de l'animation : aucune détection de changement Angular.
 */
@Directive({ selector: '[appScrollProgress]' })
export class ScrollProgressDirective implements OnInit, OnDestroy {
  readonly start = input(0.9);
  readonly end = input(0.4);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private frame = 0;
  private readonly onScroll = () => {
    if (!this.frame) this.frame = requestAnimationFrame(this.update);
  };

  private readonly update = () => {
    this.frame = 0;
    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    const from = vh * this.start();
    const to = vh * this.end() - rect.height;
    const p = Math.min(1, Math.max(0, (from - rect.top) / (from - to)));
    node.style.setProperty('--p', p.toFixed(4));
  };

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.el.nativeElement.style.setProperty('--p', '1');
      return;
    }
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.update();
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    cancelAnimationFrame(this.frame);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }
}
