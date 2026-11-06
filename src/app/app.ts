import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header';
import { Footer } from './layout/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <a class="skip" href="#contenu">Aller au contenu</a>
    <app-header />
    <main id="contenu">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: `
    .skip {
      position: fixed;
      left: 16px;
      top: -60px;
      z-index: 200;
      padding: 12px 16px;
      border-radius: var(--r-2);
      background: var(--ochre);
      color: var(--ochre-ink);
      font-weight: 600;
    }
    .skip:focus-visible { top: 16px; }
  `,
})
export class App {}
