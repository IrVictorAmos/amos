import { Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/portfolio.data';
import { ProjectVisual } from '../../components/project-visual';
import { ContactForm } from '../../components/contact-form';
import { RevealDirective } from '../../shared/reveal.directive';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-project',
  imports: [RouterLink, ProjectVisual, ContactForm, RevealDirective],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class ProjectPage {
  /** lié au paramètre de route :slug (withComponentInputBinding) */
  readonly slug = input.required<string>();

  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  private readonly found = computed(() => PROJECTS.find((x) => x.slug === this.slug()));
  protected readonly project = computed(() => this.found() ?? PROJECTS[0]);

  protected readonly next = computed(() => {
    const i = PROJECTS.findIndex((x) => x.slug === this.project().slug);
    return PROJECTS[(i + 1) % PROJECTS.length];
  });

  constructor() {
    effect(() => {
      const p = this.found();
      if (!p) {
        this.router.navigateByUrl('/');
        return;
      }
      this.seo.update({
        title: `${p.name} : ${p.kind.toLowerCase()} — Victor Amos`,
        description: `${p.summary} Réalisé par Victor Amos, ingénieur logiciel à Bukavu.`,
        path: `/projets/${p.slug}`,
        image: p.slug === 'beelshop' ? '/images/og-beelshop.jpg' : undefined,
        type: 'article',
        jsonLd: this.seo.projectJsonLd(p),
      });
    });
  }
}
