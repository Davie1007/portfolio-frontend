import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from './services/content.service';
import { SeoService } from './services/seo.service';
import { NavHeaderComponent } from './components/nav-header.component';
import { BackgroundGridComponent } from './components/background-grid.component';
import { SayHelloComponent } from './components/say-hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, NavHeaderComponent, BackgroundGridComponent, SayHelloComponent],
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  readonly site = this.content.site;
  readonly caseStudies = this.content.caseStudies;

  readonly year = new Date().getFullYear();
  readonly yearShort = "'" + String(this.year).slice(-2);

  ngOnInit(): void {
    this.seo.updateMetadata({
      title: 'David Karanja — Creative Developer & Systems Engineer',
      description:
        'Portfolio of David Karanja: Creative Developer and Systems Engineer specialising in high-performance web applications, enterprise ERP deployments, and interactive 3D configurators.',
      canonicalUrl: 'https://karanjadavid.com/',
      keywords:
        'David Karanja, Creative Developer, Systems Engineer, Three.js, WebGL, Angular, Laravel, Dolibarr ERP, M-Pesa Integration, TypeScript, Kenya',
      image: 'https://karanjadavid.com/assets/hero.webp',
      type: 'website',
      schema: [
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': 'https://karanjadavid.com/#person',
          name: 'David Karanja',
          jobTitle: 'Creative Developer & Systems Engineer',
          url: 'https://karanjadavid.com',
          sameAs: [
            'https://linkedin.com/in/david-karanja',
            'https://github.com/david-karanja',
          ],
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Creative Developer & Systems Engineer',
            skills:
              'Three.js, WebGL, Angular, TypeScript, React, Laravel, MySQL, Redis, Tailwind CSS, Docker, Linux, Safaricom Cloud',
          },
          knowsAbout: [
            'Interactive 3D Web',
            'Creative Development',
            'Enterprise ERP Systems',
            'Fintech & Payment Automation',
            'Full-Stack Web Engineering',
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': 'https://karanjadavid.com/#website',
          name: 'David Karanja Portfolio',
          url: 'https://karanjadavid.com',
          description:
            'Portfolio of David Karanja: Creative Developer and Systems Engineer specialising in high-performance web applications, enterprise ERP deployments, and interactive 3D configurators.',
          author: {
            '@type': 'Person',
            '@id': 'https://karanjadavid.com/#person',
          },
        },
      ],
    });
  }
}
