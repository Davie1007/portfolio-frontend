import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoTags {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  schema?: Record<string, any> | Record<string, any>[];
}

const DEFAULT_ORIGIN = 'https://karanjadavid.com';
const DEFAULT_IMAGE = `${DEFAULT_ORIGIN}/assets/hero.webp`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  private readonly document = inject(DOCUMENT);

  updateMetadata(tags: SeoTags): void {
    const fullTitle = tags.title;
    const url = tags.canonicalUrl || DEFAULT_ORIGIN;
    const image = tags.image || DEFAULT_IMAGE;
    const type = tags.type || 'website';
    const keywords =
      tags.keywords ||
      'David Karanja, Creative Developer, Systems Engineer, Three.js, WebGL, Angular, Laravel, Dolibarr ERP, M-Pesa Integration, TypeScript, Kenya';

    // 1. Document Title
    this.titleService.setTitle(fullTitle);

    // 2. Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: tags.description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ name: 'author', content: 'David Karanja' });
    this.metaService.updateTag({
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    // 3. Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: tags.description });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:type', content: type });
    this.metaService.updateTag({ property: 'og:site_name', content: 'David Karanja Portfolio' });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });

    // 4. Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: tags.description });
    this.metaService.updateTag({ name: 'twitter:image', content: image });
    this.metaService.updateTag({ name: 'twitter:creator', content: '@davidkaranja' });

    // 5. Canonical Link
    this.updateCanonicalUrl(url);

    // 6. JSON-LD Structured Data
    if (tags.schema) {
      this.setJsonLd(tags.schema);
    }
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: Record<string, any> | Record<string, any>[]): void {
    let script: HTMLScriptElement | null = this.document.getElementById(
      'dynamic-json-ld',
    ) as HTMLScriptElement;

    if (!script) {
      script = this.document.createElement('script');
      script.id = 'dynamic-json-ld';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }
}
