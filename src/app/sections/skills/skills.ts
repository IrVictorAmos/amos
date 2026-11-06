import { Component } from '@angular/core';
import { SKILLS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section class="section" id="skills">
      <div class="container">
        <div appReveal>
          <p class="eyebrow">02 — Compétences</p>
          <h2 class="section-title">Ma boîte à outils</h2>
        </div>

        <div class="skills">
          @for (group of skills; track group.title) {
            <article class="card" appReveal>
              <h3>{{ group.title }}</h3>
              <ul class="chips">
                @for (item of group.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .skills {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
      margin-top: 3rem;
    }
    h3 {
      font-family: var(--font-display);
      font-size: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      list-style: none;
    }
    .chips li {
      padding: 0.4rem 0.85rem;
      font-size: 0.9rem;
      border-radius: 999px;
      border: 1px solid var(--border-strong);
      color: var(--text);
      background: rgba(255, 255, 255, 0.02);
    }
  `,
})
export class Skills {
  protected readonly skills = SKILLS;
}
