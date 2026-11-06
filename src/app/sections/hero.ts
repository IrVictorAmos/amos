import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
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

      const el = this.portrait()?.nativeElement;
      if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      /*
       * Animation pilotée par le défilement, dans les deux sens :
       * --e (entrée) : 0 quand le portrait arrive par le bas, 1 quand il est bien visible ;
       * --x (sortie) : 0 tant qu'il est visible, 1 quand il a quitté l'écran par le haut.
       * Les lamelles, la couleur, la ligne de lecture et les étiquettes suivent ces valeurs,
       * à la vitesse du défilement, et reviennent en arrière quand on remonte.
       */
      let sFrame = 0;
      const clamp = (v: number) => Math.min(1, Math.max(0, v));
      const onScroll = () => {
        if (sFrame) return;
        sFrame = requestAnimationFrame(() => {
          sFrame = 0;
          const r = el.getBoundingClientRect();
          const vh = window.innerHeight;
          const e = clamp((vh - r.top) / (vh * 0.45));
          const startExit = Math.min(r.top + window.scrollY, vh * 0.22);
          const x = clamp((startExit - r.top) / (r.height * 0.9));
          const scan = e < 1 ? e : x;
          el.style.setProperty('--e', e.toFixed(4));
          el.style.setProperty('--x', x.toFixed(4));
          el.style.setProperty('--g', Math.max(1 - e, x).toFixed(4));
          el.style.setProperty('--scan', scan.toFixed(4));
          el.style.setProperty('--scan-o', scan > 0.01 && scan < 0.99 ? '1' : '0');
        });
      };
      zone.runOutsideAngular(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
      });
      onScroll();
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      });

      // Inclinaison 3D qui suit le pointeur (souris uniquement).
      if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

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
