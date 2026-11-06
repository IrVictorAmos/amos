import { Component, input } from '@angular/core';

export type SocialIconName = 'linkedin' | 'github' | 'facebook' | 'email';

/** Icônes des réseaux, en SVG inline (aucune ressource externe), couleur héritée du texte. */
@Component({
  selector: 'app-social-icon',
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" aria-hidden="true" focusable="false">
      @switch (name()) {
        @case ('linkedin') {
          <path
            fill="currentColor"
            d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.36h-4v-4.75c0-1.13-.02-2.6-1.58-2.6-1.59 0-1.83 1.24-1.83 2.52v4.83h-4z"
          />
        }
        @case ('github') {
          <path
            fill="currentColor"
            transform="translate(1.5 1.5) scale(1.3125)"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        }
        @case ('facebook') {
          <path
            fill="currentColor"
            d="M13.6 21.9v-7.7h2.6l.4-3h-3V9.3c0-.87.24-1.46 1.49-1.46h1.6V5.15a21 21 0 0 0-2.33-.12c-2.3 0-3.88 1.4-3.88 3.98v2.2H7.88v3h2.6v7.7C5.69 21.17 2 17.02 2 12 2 6.48 6.48 2 12 2s10 4.48 10 10c0 5.02-3.69 9.17-8.4 9.9z"
          />
        }
        @case ('email') {
          <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="M3.5 6.5 12 13l8.5-6.5" />
          </g>
        }
      }
    </svg>
  `,
  styles: `
    :host { display: inline-flex; flex: none; }
    svg { display: block; }
  `,
})
export class SocialIcon {
  readonly name = input.required<SocialIconName>();
  readonly size = input(20);
}
