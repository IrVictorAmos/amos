import { Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';
import { ContactForm } from '../components/contact-form';
import { SocialIcon } from '../components/social-icon';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, SocialIcon],
  template: `
    <section class="section contact" id="contact" aria-labelledby="contact-title">
      <div class="wrap contact__grid">
        <div class="contact__intro">
          <h2 class="contact__title" id="contact-title">Un projet à construire&#8239;? Parlons-en.</h2>
          <p class="lead">
            Application web, mobile, refonte d'architecture ou intégration de l'IA dans vos outils : décrivez
            votre besoin, je vous réponds personnellement.
          </p>
          <ul class="channels">
            <li>
              <a class="channel" [href]="'mailto:' + profile.email">
                <span class="channel__icon"><app-social-icon name="email" /></span>
                <span class="channel__text"><span class="channel__label">E-mail</span>{{ profile.email }}</span>
              </a>
            </li>
            @for (s of socials; track s.label) {
              <li>
                <a class="channel" [href]="s.url" target="_blank" rel="noopener me">
                  <span class="channel__icon"><app-social-icon [name]="s.icon" /></span>
                  <span class="channel__text"><span class="channel__label">{{ s.label }}</span>{{ s.handle }}</span>
                </a>
              </li>
            }
          </ul>
          <p class="base">{{ profile.city }}, disponible sur place et à distance.</p>
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
      list-style: none;
      padding: 0;
      display: grid;
      gap: var(--s-2);
      margin-top: var(--s-7);
    }
    .channel {
      display: flex;
      align-items: center;
      gap: var(--s-4);
      min-height: 64px;
      padding: var(--s-2) var(--s-4) var(--s-2) var(--s-2);
      border-radius: var(--r-3);
      border: 1px solid var(--line);
      background: color-mix(in oklch, var(--ink-1) 60%, transparent);
      transition: border-color var(--d-fast), background-color var(--d-fast);
    }
    .channel:hover {
      border-color: var(--line-2);
      background: var(--ink-1);
    }
    .channel__icon {
      display: grid;
      place-items: center;
      flex: none;
      width: 48px;
      height: 48px;
      border-radius: var(--r-2);
      background: var(--ink-2);
      color: var(--bone);
      transition: background-color var(--d-base), color var(--d-base), transform var(--d-base) var(--ease-out);
    }
    .channel:hover .channel__icon {
      background: var(--ochre);
      color: var(--ochre-ink);
      transform: rotate(-6deg) scale(1.05);
    }
    .channel__text {
      display: grid;
      min-width: 0;
      font-weight: 500;
      overflow-wrap: anywhere;
    }
    .channel__label {
      color: var(--bone-3);
      font-size: var(--step--1);
      font-weight: 400;
    }
    .base {
      margin-top: var(--s-5);
      color: var(--bone-3);
      font-size: var(--step--1);
    }
    @media (min-width: 640px) and (max-width: 1023px) {
      .channels { grid-template-columns: 1fr 1fr; }
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
