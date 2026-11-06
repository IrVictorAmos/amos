import { Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';
import { ContactForm } from '../components/contact-form';

@Component({
  selector: 'app-contact',
  imports: [ContactForm],
  template: `
    <section class="section contact" id="contact" aria-labelledby="contact-title">
      <div class="wrap contact__grid">
        <div class="contact__intro">
          <h2 class="contact__title" id="contact-title">Un projet à construire&#8239;? Parlons-en.</h2>
          <p class="lead">
            Application web, mobile, refonte d'architecture ou intégration de l'IA dans vos outils : décrivez
            votre besoin, je vous réponds personnellement.
          </p>
          <dl class="channels">
            <div>
              <dt>E-mail</dt>
              <dd><a class="link" [href]="'mailto:' + profile.email">{{ profile.email }}</a></dd>
            </div>
            <div>
              <dt>Base</dt>
              <dd>{{ profile.city }}, disponible à distance</dd>
            </div>
            @for (s of socials; track s.label) {
              <div>
                <dt>{{ s.label }}</dt>
                <dd><a class="link" [href]="s.url" target="_blank" rel="noopener">{{ s.url.replace('https://', '') }}</a></dd>
              </div>
            }
          </dl>
        </div>

        <div class="contact__form">
          <app-contact-form mode="contact" />
        </div>
      </div>
    </section>
  `,
  styles: `
    .contact__grid {
      display: grid;
      gap: var(--s-8);
    }
    .contact__title {
      font-size: var(--step-4);
      max-width: 12ch;
      margin-bottom: var(--s-5);
    }
    .channels {
      display: grid;
      gap: var(--s-4);
      margin-top: var(--s-7);
    }
    .channels div {
      display: grid;
      grid-template-columns: 6rem 1fr;
      gap: var(--s-4);
      padding-top: var(--s-4);
      border-top: 1px solid var(--line);
    }
    dt {
      color: var(--bone-3);
      font-size: var(--step--1);
      padding-top: 2px;
    }
    dd {
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .contact__form {
      padding: var(--s-6) var(--s-5);
      border-radius: var(--r-3);
      background: var(--ink-1);
      border: 1px solid var(--line);
    }
    @media (min-width: 1024px) {
      .contact__grid {
        grid-template-columns: 5fr 7fr;
        gap: var(--s-9);
        align-items: start;
      }
      .contact__intro {
        position: sticky;
        top: 120px;
      }
      .contact__form {
        padding: var(--s-7);
      }
    }
  `,
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly socials = PROFILE.socials.filter((s) => s.url);
}
