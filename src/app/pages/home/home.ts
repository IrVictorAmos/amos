import { Component, inject } from '@angular/core';
import { Hero } from '../../sections/hero';
import { Manifesto } from '../../sections/manifesto';
import { Work } from '../../sections/work';
import { Services } from '../../sections/services';
import { Architecture } from '../../sections/architecture';
import { Method } from '../../sections/method';
import { Contact } from '../../sections/contact';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../data/portfolio.data';

@Component({
  selector: 'app-home',
  imports: [Hero, Manifesto, Work, Services, Architecture, Method, Contact],
  template: `
    <app-hero />
    <app-manifesto />
    <app-work />
    <app-services />
    <app-architecture />
    <app-method />
    <app-contact />
  `,
})
export class Home {
  constructor() {
    const seo = inject(SeoService);
    seo.update({
      title: SITE.title,
      description: SITE.description,
      path: '/',
      type: 'profile',
      jsonLd: seo.homeJsonLd(),
    });
  }
}
