import { Component, input } from '@angular/core';

/**
 * Mini-interfaces dessinées en HTML/CSS, une par projet.
 * Elles s'animent quand la carte devient visible (.is-visible posé par appReveal sur le parent)
 * ou en permanence avec [live]="true" (page projet).
 */
@Component({
  selector: 'app-project-visual',
  template: `
    <div class="ui" [class.live]="live()" [attr.data-kind]="slug()" aria-hidden="true">
      @switch (slug()) {
        @case ('schoolreflexe') {
          <div class="win">
            <div class="win__bar"><i></i><i></i><i></i><span>Bulletin, 4e Scientifique</span></div>
            <div class="report">
              <div class="report__head">
                <div><b>Mukendi Grâce</b><small>2e période</small></div>
                <span class="chip chip--ok">Admise</span>
              </div>
              @for (row of grades; track row.c; let i = $index) {
                <div class="grade" [style.--i]="i">
                  <span>{{ row.c }}</span>
                  <span class="bar"><span [style.--v]="row.v"></span></span>
                  <b>{{ row.v }}</b>
                </div>
              }
              <div class="report__total"><span>Pourcentage</span><b>72,4 %</b></div>
            </div>
            <div class="badge-offline">Hors ligne, synchronisé</div>
          </div>
        }
        @case ('beelshop') {
          <div class="win">
            <div class="win__bar"><i></i><i></i><i></i><span>beelshops</span><em class="cart">3</em></div>
            <div class="flash">Vente flash <b>02:14:09</b></div>
            <div class="shop">
              @for (p of products; track p.n; let i = $index) {
                <div class="product" [style.--i]="i">
                  <div class="product__img" [style.--hue]="p.h"></div>
                  <span>{{ p.n }}</span>
                  <b>{{ p.p }}</b>
                </div>
              }
            </div>
          </div>
        }
        @case ('events') {
          <div class="ticket">
            <div class="ticket__main">
              <small>Conférence</small>
              <b>Tech Kivu Days</b>
              <div class="ticket__meta"><span>Sam. 14 nov.</span><span>Salle A</span></div>
              <div class="ticket__ok"><i></i>Accès confirmé</div>
            </div>
            <div class="ticket__stub">
              <div class="qr">
                @for (c of qr; track $index) {
                  <i [class.on]="c"></i>
                }
              </div>
            </div>
          </div>
        }
        @case ('gestion-hospitaliere') {
          <div class="win">
            <div class="win__bar"><i></i><i></i><i></i><span>Dossier patient</span></div>
            <div class="patient">
              <div class="patient__id"><span class="avatar">BN</span><div><b>Bahati N.</b><small>Médecine interne</small></div></div>
              <svg class="vitals" viewBox="0 0 200 50" preserveAspectRatio="none">
                <polyline points="0,30 30,30 40,30 48,10 56,44 64,26 90,28 120,28 128,12 136,42 144,27 200,27" />
              </svg>
              @for (a of visits; track a.t; let i = $index) {
                <div class="visit" [style.--i]="i"><span>{{ a.t }}</span><b>{{ a.l }}</b><em [attr.data-s]="a.s">{{ a.s }}</em></div>
              }
            </div>
          </div>
        }
      }
    </div>
  `,
  styleUrl: './project-visual.scss',
})
export class ProjectVisual {
  readonly slug = input.required<string>();
  readonly live = input(false);

  protected readonly grades = [
    { c: 'Mathématiques', v: 84 },
    { c: 'Physique', v: 76 },
    { c: 'Chimie', v: 69 },
    { c: 'Français', v: 61 },
  ];

  protected readonly products = [
    { n: 'Sac cuir', p: '45 $', h: 60 },
    { n: 'Montre', p: '120 $', h: 250 },
    { n: 'Baskets', p: '68 $', h: 20 },
    { n: 'Casque', p: '89 $', h: 170 },
  ];

  protected readonly visits = [
    { t: '08:30', l: 'Consultation', s: 'Fait' },
    { t: '10:15', l: 'Analyses labo', s: 'En cours' },
    { t: '14:00', l: 'Suivi', s: 'Prévu' },
  ];

  /** motif de QR fixe (pseudo-aléatoire mais stable) */
  protected readonly qr = Array.from({ length: 49 }, (_, i) => ((i * 7 + (i % 5) * 3) % 5 < 2 ? 1 : 0)).map(
    (v, i) => ([0, 1, 7, 8, 5, 6, 12, 13, 35, 36, 42, 43].includes(i) ? 1 : v),
  );
}
