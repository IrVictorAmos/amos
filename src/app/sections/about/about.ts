import { Component } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  template: `
    <section class="section" id="about">
      <div class="container about">
        <div appReveal>
          <p class="eyebrow">01 — À propos</p>
          <h2 class="section-title">Créer des expériences web <span class="gradient-text">qui marquent.</span></h2>
        </div>

        <div class="about__body" appReveal>
          @for (paragraph of profile.about; track $index) {
            <p>{{ paragraph }}</p>
          }

          <dl class="stats">
            @for (stat of profile.stats; track stat.label) {
              <div class="stat">
                <dt>{{ stat.label }}</dt>
                <dd>{{ stat.value }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 4rem;
    }
    .about__body p {
      color: var(--text-muted);
      font-size: 1.1rem;
      margin-bottom: 1.25rem;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-top: 2.5rem;
    }
    .stat {
      display: flex;
      flex-direction: column-reverse;
      padding: 1.5rem;
      border: 1px solid var(--border);
      border-radius: var(--radius);
      background: var(--surface);
    }
    .stat dd {
      font-family: var(--font-display);
      font-size: 2.25rem;
      font-weight: 700;
      letter-spacing: -0.03em;
    }
    .stat dt {
      color: var(--text-muted);
      font-size: 0.85rem;
    }
    @media (max-width: 860px) {
      .about { grid-template-columns: 1fr; gap: 2rem; }
    }
    @media (max-width: 520px) {
      .stats { grid-template-columns: 1fr; }
    }
  `,
})
export class About {
  protected readonly profile = PROFILE;
}
