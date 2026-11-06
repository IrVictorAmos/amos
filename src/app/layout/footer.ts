import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../data/portfolio.data';
import { SocialIcon } from '../components/social-icon';

type Pattern = 'flicker' | 'sweep' | 'pulse';

/**
 * Pied de page avec une enseigne lumineuse : une ampoule s'allume à des moments
 * irréguliers sur une partie du nom, grésille et s'éteint ; parfois elle traverse
 * tout le nom, qui s'illumine entièrement avant de s'éteindre.
 * Sur ordinateur, l'ampoule suit la souris ; sur téléphone, toucher le nom lance une traversée.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, SocialIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly socials = PROFILE.socials.filter((s) => s.url);
  protected readonly year = new Date().getFullYear();

  private readonly sign = viewChild<ElementRef<HTMLElement>>('sign');
  private current?: Animation;
  private running = false;
  private hovering = false;
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const el = this.sign()?.nativeElement;
      if (!el || typeof el.animate !== 'function') return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // L'enseigne ne tourne que lorsqu'elle est visible.
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) this.start(el);
        else this.stop();
      });
      io.observe(el);

      const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
      const move = (e: PointerEvent) => {
        if (!fine) return;
        const r = el.getBoundingClientRect();
        this.hovering = true;
        this.current?.cancel();
        el.style.setProperty('--lx', ((e.clientX - r.left) / r.width).toFixed(3));
        el.style.setProperty('--lr', '0.2');
        el.style.setProperty('--on', '1');
        el.style.setProperty('--bulb', '1');
      };
      const leave = () => {
        if (!fine) return;
        this.hovering = false;
        el.style.removeProperty('--lx');
        el.style.removeProperty('--lr');
        el.style.removeProperty('--on');
        el.style.removeProperty('--bulb');
        this.schedule(el, 600);
      };
      const tap = () => {
        if (fine) return;
        clearTimeout(this.timer);
        this.current?.cancel();
        this.play(el, 'sweep');
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      el.addEventListener('click', tap);

      destroyRef.onDestroy(() => {
        io.disconnect();
        this.stop();
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
        el.removeEventListener('click', tap);
      });
    });
  }

  private start(el: HTMLElement): void {
    if (this.running) return;
    this.running = true;
    this.schedule(el, 500);
  }

  private stop(): void {
    this.running = false;
    clearTimeout(this.timer);
    this.current?.cancel();
  }

  private schedule(el: HTMLElement, delay: number): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.running || this.hovering) return;
      const r = Math.random();
      this.play(el, r < 0.45 ? 'flicker' : r < 0.85 ? 'sweep' : 'pulse');
    }, delay);
  }

  private async play(el: HTMLElement, pattern: Pattern): Promise<void> {
    const anim = el.animate(this.frames(pattern), {
      duration: pattern === 'sweep' ? 4200 : pattern === 'flicker' ? 2600 : 2200,
      easing: 'linear',
    });
    this.current = anim;
    try {
      await anim.finished;
    } catch {
      // annulée (survol, toucher ou sortie de l'écran) : on reprend plus tard si besoin
      if (this.current === anim && this.running && !this.hovering) this.schedule(el, 1200);
      return;
    }
    if (this.current !== anim) return;
    this.schedule(el, 900 + Math.random() * 2200);
  }

  private frames(pattern: Pattern): Keyframe[] {
    if (pattern === 'flicker') {
      // l'ampoule grésille sur une zone au hasard, reste allumée, puis s'éteint
      const x = Math.round(8 + Math.random() * 84) / 100;
      const k = (offset: number, on: number): Keyframe => ({ offset, '--lx': x, '--lr': 0.19, '--on': on, '--bulb': 1 });
      return [k(0, 0), k(0.04, 1), k(0.07, 0.15), k(0.1, 0.9), k(0.13, 0.25), k(0.17, 1), k(0.7, 1), k(0.74, 0.3), k(0.77, 0.8), k(1, 0)];
    }
    if (pattern === 'sweep') {
      // traversée complète, puis tout le nom s'illumine et s'éteint en grésillant
      return [
        { offset: 0, '--lx': -0.12, '--lr': 0.17, '--on': 0, '--bulb': 1 },
        { offset: 0.06, '--lx': -0.06, '--lr': 0.17, '--on': 1, '--bulb': 1, easing: 'cubic-bezier(0.45, 0, 0.55, 1)' },
        { offset: 0.62, '--lx': 1.06, '--lr': 0.17, '--on': 1, '--bulb': 1 },
        { offset: 0.66, '--lx': 1.06, '--lr': 0.4, '--on': 1, '--bulb': 0 },
        { offset: 0.72, '--lx': 0.5, '--lr': 1.6, '--on': 1 },
        { offset: 0.86, '--lx': 0.5, '--lr': 1.6, '--on': 1 },
        { offset: 0.89, '--lx': 0.5, '--lr': 1.6, '--on': 0.2 },
        { offset: 0.91, '--lx': 0.5, '--lr': 1.6, '--on': 0.9 },
        { offset: 0.94, '--lx': 0.5, '--lr': 1.6, '--on': 0.1 },
        { offset: 1, '--lx': 0.5, '--lr': 1.6, '--on': 0 },
      ];
    }
    // tout le nom respire : s'allume doucement puis s'éteint
    return [
      { offset: 0, '--lx': 0.5, '--lr': 1.6, '--on': 0, easing: 'ease-in-out' },
      { offset: 0.45, '--lx': 0.5, '--lr': 1.6, '--on': 0.85, easing: 'ease-in-out' },
      { offset: 1, '--lx': 0.5, '--lr': 1.6, '--on': 0 },
    ];
  }
}
