import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PROJECTS } from '../../data/portfolio.data';
import { ProjectVisual } from '../../components/project-visual';
import { ContactForm } from '../../components/contact-form';
import { RevealDirective } from '../../shared/reveal.directive';

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
  private readonly title = inject(Title);

  protected readonly project = computed(() => {
    const p = PROJECTS.find((x) => x.slug === this.slug());
    if (!p) {
      queueMicrotask(() => this.router.navigateByUrl('/'));
      return PROJECTS[0];
    }
    this.title.setTitle(`${p.name}, ${p.kind.toLowerCase()} — Victor Amos`);
    return p;
  });

  protected readonly next = computed(() => {
    const i = PROJECTS.findIndex((x) => x.slug === this.project().slug);
    return PROJECTS[(i + 1) % PROJECTS.length];
  });
}
