import { Component, HostListener, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="header" [class.is-scrolled]="scrolled()" [class.is-open]="open()">
      <div class="wrap header__bar">
        <a class="mark" routerLink="/" (click)="close()" aria-label="Victor Amos, accueil">
          <span class="mark__v">V</span><span class="mark__name">Victor Amos</span>
        </a>

        <nav class="nav" aria-label="Navigation principale">
          @for (link of links; track link.fragment) {
            <a routerLink="/" [fragment]="link.fragment" class="link">{{ link.label }}</a>
          }
        </nav>

        <a class="btn btn--ghost header__cta" routerLink="/" fragment="contact">Me contacter</a>

        <button
          class="burger"
          type="button"
          [attr.aria-expanded]="open()"
          aria-controls="menu-mobile"
          (click)="toggle()"
        >
          <span class="visually-hidden">{{ open() ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
          <span class="burger__line"></span>
          <span class="burger__line"></span>
        </button>
      </div>

      <div class="sheet" id="menu-mobile" [attr.inert]="open() ? null : ''">
        <nav class="wrap sheet__nav" aria-label="Menu mobile">
          @for (link of allLinks; track link.fragment; let i = $index) {
            <a
              routerLink="/"
              [fragment]="link.fragment"
              (click)="close()"
              [style.--i]="i"
              class="sheet__link"
              >{{ link.label }}</a
            >
          }
        </nav>
        <div class="wrap sheet__foot">
          <a [href]="'mailto:' + profile.email">{{ profile.email }}</a>
          <span>{{ profile.city }}</span>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.scss',
})
export class Header {
  protected readonly profile = PROFILE;
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  protected readonly links = [
    { label: 'Réalisations', fragment: 'realisations' },
    { label: 'Expertise', fragment: 'expertise' },
    { label: 'Méthode', fragment: 'methode' },
  ];
  protected readonly allLinks = [...this.links, { label: 'Contact', fragment: 'contact' }];

  constructor() {
    effect(() => {
      document.documentElement.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 16);
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.open.set(false);
  }

  toggle(): void {
    this.open.update((v) => !v);
  }
}
