import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../data/portfolio.data';
import { ProjectVisual } from '../components/project-visual';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-work',
  imports: [RouterLink, ProjectVisual, RevealDirective],
  template: `
    <section class="section work" id="realisations" aria-labelledby="work-title">
      <div class="wrap">
        <header class="work__head">
          <h2 class="h-section" id="work-title">Réalisations</h2>
          <p class="lead">
            Des produits complets, conçus pour des utilisateurs réels : écoles, commerçants, organisateurs,
            soignants.
          </p>
        </header>

        <ul class="list">
          @for (p of projects; track p.slug; let even = $even) {
            <li class="item" [class.item--flip]="!even" appReveal>
              <a class="item__link" [routerLink]="['/projets', p.slug]">
                <div class="item__visual" [style.view-transition-name]="'visual-' + p.slug">
                  <app-project-visual [slug]="p.slug" />
                </div>

                <div class="item__body">
                  <div class="item__meta">
                    <span class="status" [attr.data-tone]="p.tone">{{ p.status }}</span>
                    <span>{{ p.year }}</span>
                  </div>
                  <h3 class="item__title" [style.view-transition-name]="'title-' + p.slug">{{ p.name }}</h3>
                  <p class="item__kind">{{ p.kind }}</p>
                  <p class="item__summary">{{ p.summary }}</p>
                  <span class="item__more">
                    Voir l'étude de cas
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </span>
                </div>
              </a>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .work__head {
      display: grid;
      gap: var(--s-5);
      margin-bottom: var(--s-8);
    }
    .list {
      list-style: none;
      padding: 0;
      display: grid;
      gap: var(--s-9);
    }
    .item__link {
      display: grid;
      gap: var(--s-6);
      border-radius: var(--r-3);
    }
    .item__visual {
      transition: transform 700ms var(--ease-out);
    }
    .item__link:hover .item__visual {
      transform: scale(0.985) rotate(-0.6deg);
    }
    .item__meta {
      display: flex;
      justify-content: space-between;
      gap: var(--s-4);
      color: var(--bone-3);
      font-size: var(--step--1);
      padding-bottom: var(--s-4);
      border-bottom: 1px solid var(--line);
    }
    .item__title {
      font-size: var(--step-4);
      font-weight: 700;
      font-stretch: 85%;
      letter-spacing: -0.04em;
      margin-top: var(--s-5);
      width: fit-content;
      transition: font-stretch 600ms var(--ease-out), color var(--d-fast);
    }
    .item__link:hover .item__title {
      font-stretch: 100%;
    }
    .item__kind {
      font-family: var(--font-display);
      font-size: var(--step-1);
      color: var(--ochre);
      margin-top: var(--s-2);
    }
    .item__summary {
      color: var(--bone-2);
      margin-top: var(--s-4);
      max-width: 52ch;
    }
    .item__more {
      display: inline-flex;
      align-items: center;
      gap: var(--s-2);
      margin-top: var(--s-5);
      min-height: 44px;
      font-weight: 600;
    }
    .item__more svg {
      transition: transform var(--d-base) var(--ease-out);
    }
    .item__link:hover .item__more svg {
      transform: translateX(6px);
    }
    @media (min-width: 900px) {
      .work__head {
        grid-template-columns: 7fr 5fr;
        align-items: end;
      }
      .item__link {
        grid-template-columns: 7fr 5fr;
        gap: var(--s-8);
        align-items: center;
      }
      .item--flip .item__visual {
        order: 2;
      }
    }
  `,
})
export class Work {
  protected readonly projects = PROJECTS;
}
