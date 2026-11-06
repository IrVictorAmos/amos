import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="wrap">
        <p class="footer__word" aria-hidden="true">Victor Amos</p>
        <div class="footer__row">
          <p>© {{ year }} {{ profile.firstName }} {{ profile.lastName }}, {{ profile.city }}. Conçu et développé avec Angular.</p>
          <ul>
            @for (s of socials; track s.label) {
              <li><a class="link" [href]="s.url" target="_blank" rel="noopener">{{ s.label }}</a></li>
            }
            <li><a class="link" [href]="'mailto:' + profile.email">E-mail</a></li>
            <li><a class="link" routerLink="/" fragment="top">Haut de page</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      padding-block: var(--s-8) var(--s-7);
      border-top: 1px solid var(--line);
      overflow: hidden;
    }
    .footer__word {
      font-family: var(--font-display);
      font-size: clamp(3.5rem, 17vw, 16rem);
      font-weight: 750;
      font-stretch: 75%;
      line-height: 0.85;
      letter-spacing: -0.04em;
      color: transparent;
      -webkit-text-stroke: 1px var(--line-2);
      white-space: nowrap;
      margin-bottom: var(--s-7);
    }
    .footer__row {
      display: flex;
      flex-direction: column;
      gap: var(--s-4);
      color: var(--bone-3);
      font-size: var(--step--1);
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: var(--s-2) var(--s-5);
      list-style: none;
      padding: 0;
      color: var(--bone-2);
    }
    a {
      display: inline-block;
      padding-block: var(--s-2);
    }
    a:hover { color: var(--bone); }
    @media (min-width: 900px) {
      .footer__row { flex-direction: row; justify-content: space-between; align-items: center; }
    }
  `,
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly socials = PROFILE.socials.filter((s) => s.url);
  protected readonly year = new Date().getFullYear();
}
