import { Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';
import { ScrollProgressDirective } from '../shared/scroll-progress.directive';

/** Le texte s'éclaire mot à mot au fil du défilement. */
@Component({
  selector: 'app-manifesto',
  imports: [ScrollProgressDirective],
  template: `
    <section class="section manifesto" aria-label="Ma vision">
      <div class="wrap">
        <p
          class="manifesto__text"
          appScrollProgress
          [start]="0.85"
          [end]="0.55"
          [style.--n]="words.length"
          [attr.aria-label]="text"
        >
          @for (word of words; track $index) {
            <span aria-hidden="true" [style.--i]="$index">{{ word }} </span>
          }
        </p>
      </div>
    </section>
  `,
  styles: `
    .manifesto {
      border-top: 1px solid var(--line);
    }
    .manifesto__text {
      font-family: var(--font-display);
      font-size: var(--step-3);
      font-weight: 560;
      line-height: 1.16;
      letter-spacing: -0.025em;
      max-width: 30ch;
      text-wrap: pretty;
    }
    span {
      /* chaque mot s'allume quand la progression le dépasse */
      opacity: clamp(0.16, calc((var(--p, 0) * (var(--n) + 8) - var(--i)) / 8), 1);
      transition: opacity 120ms linear;
    }
    @media (min-width: 1024px) {
      .manifesto__text { margin-left: calc(100% / 12 * 2); }
    }
  `,
})
export class Manifesto {
  protected readonly text = PROFILE.manifesto;
  protected readonly words = PROFILE.manifesto.split(' ');
}
