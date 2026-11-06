import { Component } from '@angular/core';
import { METHOD } from '../data/portfolio.data';
import { ScrollProgressDirective } from '../shared/scroll-progress.directive';

/** Les étapes forment une vraie séquence : la numérotation a un sens ici. */
@Component({
  selector: 'app-method',
  imports: [ScrollProgressDirective],
  template: `
    <section class="section method" id="methode" aria-labelledby="method-title">
      <div class="wrap">
        <h2 class="h-section" id="method-title">Ma méthode, du terrain à la production</h2>

        <ol class="steps" appScrollProgress [start]="0.85" [end]="0.6">
          <span class="rail" aria-hidden="true"><span></span></span>
          @for (step of steps; track step.title; let i = $index) {
            <li class="step" [style.--i]="i">
              <span class="step__n" aria-hidden="true">{{ i + 1 }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .method {
      background: var(--ink-1);
      border-block: 1px solid var(--line);
    }
    .steps {
      --n: 4;
      position: relative;
      list-style: none;
      padding: 0 0 0 56px;
      margin-top: var(--s-8);
      display: grid;
      gap: var(--s-7);
    }
    /* rail vertical (mobile) qui se remplit avec le défilement */
    .rail {
      position: absolute;
      left: 19px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: var(--line);
    }
    .rail span {
      position: absolute;
      inset: 0;
      background: var(--ochre);
      transform-origin: top;
      transform: scaleY(var(--p, 0));
    }
    .step {
      position: relative;
    }
    .step__n {
      position: absolute;
      left: -56px;
      top: -4px;
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--ink-1);
      border: 1px solid var(--line-2);
      font-family: var(--font-display);
      font-weight: 650;
      font-variant-numeric: tabular-nums;
      transition: background-color var(--d-base), color var(--d-base), border-color var(--d-base);
    }
    /* l'étape s'allume quand le rail l'atteint */
    .step {
      --on: clamp(0, calc((var(--p, 0) * var(--n) - var(--i)) * 4), 1);
    }
    .step__n {
      background: color-mix(in oklch, var(--ochre) calc(var(--on) * 100%), var(--ink-1));
      color: color-mix(in oklch, var(--ochre-ink) calc(var(--on) * 100%), var(--bone));
    }
    h3 {
      font-size: var(--step-2);
      margin-bottom: var(--s-3);
    }
    p {
      color: var(--bone-2);
      max-width: 40ch;
    }
    @media (min-width: 1024px) {
      .steps {
        grid-template-columns: repeat(4, 1fr);
        padding: 72px 0 0;
        gap: var(--s-6);
      }
      .rail {
        left: 20px;
        right: 0;
        top: 19px;
        bottom: auto;
        width: auto;
        height: 2px;
      }
      .rail span {
        transform-origin: left;
        transform: scaleX(var(--p, 0));
      }
      .step__n {
        left: 0;
        top: -72px;
      }
    }
  `,
})
export class Method {
  protected readonly steps = METHOD;
}
