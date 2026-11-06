import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SERVICES, STUDENTS } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-services',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section services" id="services" aria-labelledby="services-title">
      <div class="wrap">
        <header class="services__head">
          <h2 class="h-section" id="services-title">Ce que je fais pour vous</h2>
          <p class="lead">
            Pour les entreprises, les écoles, les ONG et les administrations : du conseil stratégique à la livraison
            du produit.
          </p>
        </header>

        <ul class="list">
          @for (s of services; track s.id; let i = $index) {
            <li class="svc" [class.is-open]="open() === i">
              <h3 class="svc__h">
                <button
                  type="button"
                  class="svc__btn"
                  [attr.aria-expanded]="open() === i"
                  [attr.aria-controls]="'svc-' + s.id"
                  (click)="toggle(i)"
                >
                  <span class="svc__title">{{ s.title }}</span>
                  <span class="svc__pitch">{{ s.pitch }}</span>
                  <span class="svc__icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="svc__panel" [id]="'svc-' + s.id" role="region" [attr.aria-label]="s.title">
                <div class="svc__inner">
                  <p class="svc__detail">{{ s.detail }}</p>
                  <div>
                    <p class="svc__label">Vous recevez</p>
                    <ul class="svc__deliv">
                      @for (d of s.deliverables; track d) {
                        <li>{{ d }}</li>
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          }
        </ul>

        <aside class="students" appReveal aria-labelledby="students-title">
          <div class="students__intro">
            <p class="students__kicker">Accompagnement des étudiants</p>
            <h3 id="students-title">{{ students.title }}</h3>
            <p>{{ students.text }}</p>
            <a class="btn" routerLink="/" [queryParams]="{ sujet: 'etudiant' }" fragment="contact">Demander un accompagnement</a>
          </div>
          <ol class="students__steps">
            @for (step of students.steps; track step; let i = $index) {
              <li [style.--i]="i"><span aria-hidden="true">{{ i + 1 }}</span>{{ step }}</li>
            }
          </ol>
        </aside>
      </div>
    </section>
  `,
  styleUrl: './services.scss',
})
export class Services {
  protected readonly services = SERVICES;
  protected readonly students = STUDENTS;
  protected readonly open = signal<number>(0);

  toggle(i: number): void {
    this.open.update((v) => (v === i ? -1 : i));
  }
}
