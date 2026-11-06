import { Component } from '@angular/core';
import { PROFILE, SOCIALS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  template: `
    <section class="section" id="contact">
      <div class="container">
        <div class="contact card" appReveal>
          <p class="eyebrow">04 — Contact</p>
          <h2 class="section-title">Travaillons <span class="gradient-text">ensemble.</span></h2>
          <p class="contact__text">
            Un projet, une opportunité ou simplement envie d'échanger ? Mon inbox est ouverte.
          </p>
          <a class="btn" [href]="'mailto:' + profile.email">{{ profile.email }}</a>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container footer__inner">
        <p>© {{ year }} {{ profile.firstName }} {{ profile.lastName }}. Fait avec Angular.</p>
        <ul>
          @for (social of socials; track social.label) {
            <li><a [href]="social.url" target="_blank" rel="noopener">{{ social.label }}</a></li>
          }
        </ul>
      </div>
    </footer>
  `,
  styles: `
    .contact {
      text-align: center;
      padding: clamp(2.5rem, 7vw, 5rem) 1.5rem;
      background:
        radial-gradient(circle at 50% 0%, rgba(124, 92, 255, 0.22), transparent 60%),
        var(--surface);
    }
    .contact__text {
      max-width: 480px;
      margin: 1rem auto 2.5rem;
      color: var(--text-muted);
      font-size: 1.1rem;
    }
    .footer {
      padding: 2rem 0 3rem;
      border-top: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.9rem;
    }
    .footer__inner {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-between;
    }
    .footer ul { display: flex; gap: 1.5rem; list-style: none; }
    .footer a:hover { color: var(--text); }
  `,
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly socials = SOCIALS;
  protected readonly year = new Date().getFullYear();
}
