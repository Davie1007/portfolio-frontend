import { Component, inject } from '@angular/core';
import { NavHeaderComponent } from '../components/nav-header.component';
import { BackgroundGridComponent } from '../components/background-grid.component';
import { SayHelloComponent } from '../components/say-hello.component';
import { ContentService } from '../services/content.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavHeaderComponent, BackgroundGridComponent, SayHelloComponent],
  template: `
    <app-nav-header />

    <main class="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden pt-32 sm:pt-40 md:pt-48">
      <app-background-grid theme="dark" />

      <div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 pb-32">
        <!-- Main 'Hey.' headline -->
        <header class="flex flex-col">
          <h1 class="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-none select-none">
            {{ about.heading }}
          </h1>
          <p class="mt-8 text-xl sm:text-2xl md:text-3xl font-light text-neutral-300 max-w-4xl leading-relaxed">
            {{ about.subheading }}
          </p>
        </header>

        <!-- Bio narrative -->
        <section class="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8" aria-label="Biography">
          <div class="md:col-span-3">
            <span class="font-mono text-xs uppercase tracking-widest text-neutral-500">Overview</span>
          </div>
          <div class="md:col-span-9 space-y-6 text-base sm:text-lg text-neutral-400 max-w-3xl leading-relaxed font-normal">
            @for (paragraph of about.bio; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>
        </section>

        <!-- Quick Facts -->
        <section class="mt-16 sm:mt-24 border-y border-neutral-900 py-12" aria-label="Key facts">
          <dl class="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs sm:text-sm">
            @for (fact of about.facts; track fact.label) {
              <div class="flex flex-col gap-1.5">
                <dt class="uppercase tracking-wider text-neutral-500">{{ fact.label }}</dt>
                <dd class="text-white font-medium">{{ fact.value }}</dd>
              </div>
            }
          </dl>
        </section>

        <!-- MY TECH STACK -->
        <section class="mt-20 sm:mt-28" aria-labelledby="tech-stack-heading">
          <div class="flex items-center justify-between pb-6 border-b border-neutral-900">
            <h2 id="tech-stack-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
              MY TECH STACK
            </h2>
            <span class="font-mono text-[11px] text-neutral-600">PRODUCTION ARSENAL</span>
          </div>

          <div class="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            @for (tech of techStack; track tech.name) {
              <a
                [href]="tech.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-2 px-3.5 py-2 rounded-sm border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 hover:border-neutral-700 transition-all text-xs sm:text-sm font-mono text-neutral-300 hover:text-white"
              >
                <span>{{ tech.name }}</span>
                <span class="text-neutral-600 group-hover:text-[#d4ff00] text-xs transition-colors">↗</span>
              </a>
            }
          </div>
        </section>

        <!-- HOW I WORK -->
        <section class="mt-24 sm:mt-32" aria-labelledby="how-i-work-heading">
          <div class="flex items-center justify-between pb-6 border-b border-neutral-900">
            <h2 id="how-i-work-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
              HOW I WORK
            </h2>
            <span class="font-mono text-[11px] text-neutral-600">PHILOSOPHY & PROCESS</span>
          </div>

          <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            @for (item of about.principles; track item.title; let idx = $index) {
              <article class="p-6 sm:p-8 rounded-sm border border-neutral-900 bg-neutral-950/40 hover:border-neutral-800 transition-all flex flex-col justify-between gap-6">
                <span class="font-mono text-xs text-[#d4ff00]">0{{ idx + 1 }}</span>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold tracking-tight text-white">{{ item.title }}</h3>
                  <p class="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                    {{ item.text }}
                  </p>
                </div>
              </article>
            }
          </div>
        </section>
      </div>

      <!-- Say Hello Footer -->
      <app-say-hello theme="dark" />
    </main>
  `,
})
export class AboutComponent {
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  readonly about = this.content.about;
  readonly techStack = this.content.techStack;

  constructor() {
    this.seo.updateMetadata({
      title: 'About | David Karanja — Creative Developer & Systems Engineer',
      description:
        'David Karanja is a creative developer and software engineer bridging mathematics, robust business systems, ERP architectures, and interactive 3D web experiences.',
      canonicalUrl: 'https://karanjadavid.com/about',
      type: 'profile',
      keywords:
        'David Karanja, About, Creative Developer, Bio, Philosophy, Tech Stack, Systems Engineer, Kenya',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About David Karanja',
        url: 'https://karanjadavid.com/about',
        description:
          'David Karanja is a creative developer and software engineer bridging mathematics, robust business systems, ERP architectures, and interactive 3D web experiences.',
        mainEntity: {
          '@type': 'Person',
          name: 'David Karanja',
          jobTitle: 'Creative Developer & Systems Engineer',
          url: 'https://karanjadavid.com',
        },
      },
    });
  }
}
