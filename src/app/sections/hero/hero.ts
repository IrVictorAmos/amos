import { Component } from '@angular/core';
import { PROFILE, SOCIALS } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly socials = SOCIALS;
}
