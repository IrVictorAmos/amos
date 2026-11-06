import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../data/portfolio.data';
import { ScrollProgressDirective } from '../shared/scroll-progress.directive';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, ScrollProgressDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly time = signal(this.now());
  protected readonly strips = Array.from({ length: 7 }, (_, i) => i);
  protected readonly tags = [
    { label: 'Architecture logicielle', pos: 'a' },
    { label: 'Web et mobile', pos: 'b' },
    { label: 'IA intégrée', pos: 'c' },
  ];

  private readonly portrait = viewChild<ElementRef<HTMLElement>>('portrait');

  constructor() {
    const destroyRef = inject(DestroyRef);
    const zone = inject(NgZone);

    // Uniquement dans le navigateur : rien de tout ça n'existe au pré-rendu.
    afterNextRender(() => {
      const id = setInterval(() => this.time.set(this.now()), 15_000);
      destroyRef.onDestroy(() => clearInterval(id));

      // Inclinaison 3D qui suit le pointeur (souris). Sur mobile, c'est le défilement qui anime le portrait.
      const el = this.portrait()?.nativeElement;
      if (!el || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      let frame = 0;
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
          el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
          el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
          el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
        });
      };
      const leave = () => {
        cancelAnimationFrame(frame);
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--gx', '50%');
        el.style.setProperty('--gy', '0%');
      };
      zone.runOutsideAngular(() => {
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
      });
      destroyRef.onDestroy(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      });
    });
  }

  private now(): string {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: PROFILE.timeZone,
    }).format(new Date());
  }
}
