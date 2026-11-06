import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly time = signal(this.now());

  constructor() {
    const id = setInterval(() => this.time.set(this.now()), 15_000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  private now(): string {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: PROFILE.timeZone,
    }).format(new Date());
  }
}
