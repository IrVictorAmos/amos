import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PROFILE, PROJECTS, SERVICES, SITE, STUDENTS, type Project } from '../data/portfolio.data';

export interface SeoData {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  jsonLd: object;
}

/**
 * Titre, description, URL canonique, Open Graph, Twitter et données structurées (JSON-LD).
 * Exécuté aussi au pré-rendu : tout est écrit dans le HTML statique lu par Google et les IA.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);

  update(data: SeoData): void {
    const url = SITE.url + data.path;
    const image = SITE.url + (data.image ?? SITE.image);

    this.titleService.setTitle(data.title);
    const tags: [string, string, 'name' | 'property'][] = [
      ['description', data.description, 'name'],
      ['robots', 'index, follow, max-image-preview:large, max-snippet:-1', 'name'],
      ['author', `${PROFILE.firstName} ${PROFILE.lastName}`, 'name'],
      ['og:type', data.type ?? 'website', 'property'],
      ['og:site_name', SITE.name, 'property'],
      ['og:locale', 'fr_FR', 'property'],
      ['og:title', data.title, 'property'],
      ['og:description', data.description, 'property'],
      ['og:url', url, 'property'],
      ['og:image', image, 'property'],
      ['og:image:width', '1200', 'property'],
      ['og:image:height', '630', 'property'],
      ['twitter:card', 'summary_large_image', 'name'],
      ['twitter:title', data.title, 'name'],
      ['twitter:description', data.description, 'name'],
      ['twitter:image', image, 'name'],
    ];
    for (const [key, content, attr] of tags) {
      this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
    }

    let canonical = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.doc.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    let ld = this.doc.head.querySelector<HTMLScriptElement>('script#ld-json');
    if (!ld) {
      ld = this.doc.createElement('script');
      ld.id = 'ld-json';
      ld.type = 'application/ld+json';
      this.doc.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(data.jsonLd).replace(/</g, '\\u003c');
  }

  /** Données structurées de la personne, réutilisées partout. */
  person(): object {
    return {
      '@type': 'Person',
      '@id': `${SITE.url}/#victor-amos`,
      name: `${PROFILE.firstName} ${PROFILE.lastName}`,
      givenName: PROFILE.firstName,
      familyName: PROFILE.lastName,
      honorificPrefix: 'Ir.',
      jobTitle: 'Ingénieur développeur web et mobile, architecte logiciel',
      description: PROFILE.intro,
      url: SITE.url,
      image: `${SITE.url}/images/victor-amos-800.webp`,
      email: `mailto:${PROFILE.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Bukavu', addressRegion: 'Sud-Kivu', addressCountry: 'CD' },
      sameAs: PROFILE.socials.map((s) => s.url),
      knowsLanguage: ['fr', 'en'],
      knowsAbout: [
        'Architecture logicielle',
        'Développement web',
        'Développement mobile',
        'Angular',
        'Flutter',
        'Symfony',
        'API Platform',
        'PostgreSQL',
        'Docker',
        'Domain-Driven Design',
        'Intelligence artificielle',
        'Prompt engineering',
        'Schéma directeur informatique',
        'Audit informatique',
      ],
    };
  }

  homeJsonLd(): object {
    const person = this.person();
    return {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'WebSite',
          '@id': `${SITE.url}/#site`,
          url: SITE.url,
          name: SITE.name,
          inLanguage: 'fr',
          publisher: { '@id': `${SITE.url}/#victor-amos` },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${SITE.url}/#page`,
          url: SITE.url,
          name: SITE.title,
          inLanguage: 'fr',
          mainEntity: { '@id': `${SITE.url}/#victor-amos` },
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${SITE.url}/#services`,
          name: 'Victor Amos, ingénierie logicielle',
          url: SITE.url,
          email: PROFILE.email,
          image: `${SITE.url}${SITE.image}`,
          founder: { '@id': `${SITE.url}/#victor-amos` },
          address: { '@type': 'PostalAddress', addressLocality: 'Bukavu', addressCountry: 'CD' },
          areaServed: [{ '@type': 'Country', name: 'République démocratique du Congo' }, 'Afrique', 'International (à distance)'],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Services',
            itemListElement: [
              ...SERVICES.map((s) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.title, description: s.detail },
              })),
              {
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: 'Accompagnement des étudiants en informatique', description: STUDENTS.text },
              },
            ],
          },
        },
        {
          '@type': 'ItemList',
          name: 'Réalisations',
          itemListElement: PROJECTS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE.url}/projets/${p.slug}`,
            name: p.name,
          })),
        },
      ],
    };
  }

  projectJsonLd(p: Project): object {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: p.name,
          description: p.summary,
          applicationCategory: p.slug === 'beelshop' ? 'ShoppingApplication' : 'BusinessApplication',
          operatingSystem: 'Web',
          url: p.url ?? `${SITE.url}/projets/${p.slug}`,
          dateCreated: p.year,
          creator: { '@id': `${SITE.url}/#victor-amos` },
          featureList: p.built.join(' ; '),
          ...(p.image ? { screenshot: `${SITE.url}/${p.image.src}-1600.webp` } : {}),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
            { '@type': 'ListItem', position: 2, name: 'Réalisations', item: `${SITE.url}/#realisations` },
            { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE.url}/projets/${p.slug}` },
          ],
        },
        this.person(),
      ],
    };
  }
}
