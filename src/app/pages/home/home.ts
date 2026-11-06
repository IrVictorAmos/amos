import { Component } from '@angular/core';
import { Hero } from '../../sections/hero';
import { Manifesto } from '../../sections/manifesto';
import { Work } from '../../sections/work';
import { Expertise } from '../../sections/expertise';
import { Method } from '../../sections/method';
import { Contact } from '../../sections/contact';

@Component({
  selector: 'app-home',
  imports: [Hero, Manifesto, Work, Expertise, Method, Contact],
  template: `
    <app-hero />
    <app-manifesto />
    <app-work />
    <app-expertise />
    <app-method />
    <app-contact />
  `,
})
export class Home {}
