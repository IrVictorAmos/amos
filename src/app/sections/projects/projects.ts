import { Component } from '@angular/core';
import { PROJECTS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective],
  template: `
    <section class="section" id="projects">
      <div class="container">
        <div appReveal>
          <p class="eyebrow">03 — Projets</p>
          <h2 class="section-title">Quelques réalisations</h2>
        </div>

        <div class="projects">
          @for (project of projects; track project.title; let i = $index) {
            <article class="card project" appReveal>
              <span class="project__index">{{ (i + 1).toString().padStart(2, '0') }}</span>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>

              <ul class="tags">
                @for (tag of project.tags; track tag) {
                  <li>{{ tag }}</li>
                }
              </ul>

              <div class="project__links">
                @if (project.demo) {
                  <a [href]="project.demo" target="_blank" rel="noopener">Voir le site ↗</a>
                }
                @if (project.repo) {
                  <a [href]="project.repo" target="_blank" rel="noopener">Code source ↗</a>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .projects {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      margin-top: 3rem;
    }
    @media (max-width: 760px) {
      .projects { grid-template-columns: 1fr; }
    }
    .project {
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 280px;
      overflow: hidden;
    }
    .project::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top right, rgba(124, 92, 255, 0.18), transparent 55%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .project:hover::before { opacity: 1; }
    .project__index {
      font-family: var(--font-display);
      color: var(--accent);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    h3 {
      font-family: var(--font-display);
      font-size: 1.6rem;
      letter-spacing: -0.02em;
      margin-bottom: 0.75rem;
    }
    p {
      color: var(--text-muted);
      flex: 1;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      list-style: none;
      margin: 1.5rem 0 1rem;
    }
    .tags li {
      font-size: 0.78rem;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      background: var(--accent-soft);
      color: var(--accent-light);
    }
    .project__links {
      position: relative;
      display: flex;
      gap: 1.25rem;
      font-size: 0.9rem;
    }
    .project__links a:hover { color: var(--accent); }
  `,
})
export class Projects {
  protected readonly projects = PROJECTS;
}
