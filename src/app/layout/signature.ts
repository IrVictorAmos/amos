import { Component } from '@angular/core';

/**
 * Signature de l'en-tête : un monogramme tracé au chargement, puis un jeu de lumière.
 * Une onde lumineuse parcourt les lettres, le monogramme s'allume et s'éteint, en boucle.
 * Au survol, la lumière s'allume entièrement.
 */
@Component({
  selector: 'app-signature',
  template: `
    <span class="sig">
      <svg class="mono" viewBox="0 0 40 40" aria-hidden="true">
        <rect class="mono__bg" x="1" y="1" width="38" height="38" rx="11" />
        <path class="mono__v" d="M11 11 L20 30 L29 11" />
        <circle class="mono__led" cx="29" cy="11" r="2.2" />
      </svg>
      <span class="word" aria-hidden="true">
        @for (ch of letters; track $index) {
          <span class="ch" [class.sp]="ch === ' '" [style.--i]="$index">{{ ch === ' ' ? '&nbsp;' : ch }}</span>
        }
      </span>
      <span class="visually-hidden">Victor Amos</span>
    </span>
  `,
  styles: `
    :host { display: inline-flex; }
    .sig {
      --cycle: 7s;
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }
    .mono {
      width: 36px;
      height: 36px;
      overflow: visible;
    }
    .mono__bg {
      fill: var(--ink-2);
      stroke: color-mix(in oklch, var(--ochre) 55%, transparent);
      stroke-width: 1;
      animation: mono-glow var(--cycle) var(--ease-in-out) 1.6s infinite;
    }
    .mono__v {
      fill: none;
      stroke: var(--ochre);
      stroke-width: 3.2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: draw 1.1s var(--ease-out) 0.2s forwards;
      filter: drop-shadow(0 0 0 transparent);
    }
    .mono__led {
      fill: var(--ochre-strong);
      opacity: 0;
      animation: led var(--cycle) linear 1.6s infinite;
    }
    .word {
      display: inline-flex;
      font-family: var(--font-display);
      font-weight: 650;
      font-size: 1.08rem;
      letter-spacing: -0.02em;
    }
    .ch {
      display: inline-block;
      color: var(--bone);
      animation: wave var(--cycle) var(--ease-in-out) infinite;
      animation-delay: calc(1.8s + var(--i) * 70ms);
    }
    .sp { width: 0.28em; }

    /* survol : toute la signature s'allume */
    :host(:hover) .ch,
    :host-context(a:focus-visible) .ch {
      color: var(--ochre-strong);
      text-shadow: 0 0 14px color-mix(in oklch, var(--ochre) 70%, transparent);
      transition: color 200ms, text-shadow 200ms;
    }
    :host(:hover) .mono__bg {
      stroke: var(--ochre);
      filter: drop-shadow(0 0 8px color-mix(in oklch, var(--ochre) 60%, transparent));
    }

    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes wave {
      0%, 100% { color: var(--bone); text-shadow: none; }
      4% {
        color: var(--ochre-strong);
        text-shadow: 0 0 14px color-mix(in oklch, var(--ochre) 75%, transparent),
          0 0 2px var(--ochre-strong);
      }
      10% { color: var(--bone); text-shadow: none; }
    }
    @keyframes mono-glow {
      0%, 100% { filter: drop-shadow(0 0 0 transparent); }
      6% { filter: drop-shadow(0 0 10px color-mix(in oklch, var(--ochre) 70%, transparent)); }
      16% { filter: drop-shadow(0 0 0 transparent); }
    }
    @keyframes led {
      0%, 100% { opacity: 0; }
      3%, 14% { opacity: 1; }
      5%, 9% { opacity: 0.35; }
      18% { opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .mono__v { stroke-dashoffset: 0; animation: none; }
      .ch, .mono__bg, .mono__led { animation: none !important; }
    }
  `,
})
export class Signature {
  protected readonly letters = [...'Victor Amos'];
}
