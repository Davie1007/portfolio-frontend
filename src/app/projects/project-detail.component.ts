import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { NavHeaderComponent } from '../components/nav-header.component';
import { BackgroundGridComponent } from '../components/background-grid.component';
import { SayHelloComponent } from '../components/say-hello.component';
import { ContentService } from '../services/content.service';
import { ProjectCaseStudy, TreeNode } from '../content';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, NavHeaderComponent, BackgroundGridComponent, SayHelloComponent],
  template: `
    <app-nav-header />

    @if (project(); as p) {
      <main class="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden pt-32 sm:pt-40 md:pt-48">
        <app-background-grid theme="dark" />

        <div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 pb-32">
          <!-- Back Link -->
          <div class="mb-10">
            <a
              routerLink="/"
              class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              <span>←</span>
              <span>All Projects</span>
            </a>
          </div>

          <!-- Project Title & Metadata -->
          <header class="flex flex-col">
            <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none select-none">
              {{ p.title }}
            </h1>
            <div class="mt-4 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm text-neutral-400">
              <span class="text-white font-medium">{{ p.year }}</span>
              <span>·</span>
              <span class="text-neutral-300">{{ p.category }}</span>
              @if (p.href) {
                <span>·</span>
                <a
                  [href]="p.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[#d4ff00] hover:underline"
                >
                  Live Demo ↗
                </a>
              }
              @if (p.githubUrl) {
                <span>·</span>
                <a
                  [href]="p.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-300 hover:text-white hover:underline"
                >
                  Source Code ↗
                </a>
              }
            </div>
          </header>

          <!-- Hero Showcase Media Frame -->
          <div class="mt-12 sm:mt-16 w-full">
            <div class="relative aspect-16/10 sm:aspect-16/9 xl:aspect-21/9 w-full overflow-hidden rounded-sm border border-neutral-800 bg-neutral-950 shadow-2xl flex items-center justify-center p-3 sm:p-6 md:p-8">
              <img
                [src]="p.image"
                [alt]="p.imageAlt"
                class="size-full object-contain rounded-xs"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          </div>

          <!-- Section: OBSESS -->
          <section class="mt-20 sm:mt-28 grid grid-cols-1 md:grid-cols-12 gap-8" aria-labelledby="obsess-heading">
            <div class="md:col-span-3">
              <h2 id="obsess-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Obsess
              </h2>
            </div>
            <div class="md:col-span-9 space-y-6">
              <h3 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {{ p.obsess.headline }}
              </h3>
              <div class="space-y-4 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-3xl">
                @for (para of p.obsess.paragraphs; track $index) {
                  <p>{{ para }}</p>
                }
              </div>
            </div>
          </section>

          <!-- Section: DESIGN -->
          <section class="mt-24 sm:mt-32" aria-labelledby="design-heading">
            <div class="flex items-center justify-between pb-6 border-b border-neutral-900">
              <h2 id="design-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Design
              </h2>
              <span class="font-mono text-[11px] text-neutral-600">VISUAL FOUNDATIONS</span>
            </div>

            <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Color Palette Card -->
              <div class="p-6 rounded-sm border border-neutral-900 bg-neutral-950/60 flex flex-col justify-between">
                <div>
                  <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Palette</span>
                  <p class="text-xs text-neutral-400 mt-1">Click any swatch to copy HEX code</p>
                </div>

                <div class="mt-8 grid grid-cols-5 gap-2 sm:gap-3">
                  @for (c of p.design.palette; track c.hex) {
                    <div class="flex flex-col items-center">
                      <button
                        type="button"
                        (click)="copyColor(c.hex)"
                        class="w-full h-16 sm:h-24 rounded-xs border border-white/10 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        [style.backgroundColor]="c.hex"
                        [attr.aria-label]="'Copy ' + c.name + ' ' + c.hex"
                      ></button>
                      <div class="mt-3 text-center font-mono text-[10px] leading-tight flex flex-col gap-0.5">
                        <span class="text-white font-medium">{{ c.hex }}</span>
                        <span class="text-neutral-500 hidden sm:inline">{{ c.pms }}</span>
                      </div>
                    </div>
                  }
                </div>

                @if (copiedColor()) {
                  <p class="mt-4 text-center font-mono text-xs text-[#d4ff00]">
                    ✓ Copied {{ copiedColor() }} to clipboard
                  </p>
                }
              </div>

              <!-- Typefaces Card -->
              <div class="p-6 rounded-sm border border-neutral-900 bg-neutral-950/60 flex flex-col justify-between">
                <div>
                  <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Typefaces</span>
                </div>

                <div class="mt-8 grid grid-cols-2 gap-6">
                  @for (t of p.design.typefaces; track t.name) {
                    <div class="flex flex-col justify-between">
                      <div class="flex items-baseline justify-between border-b border-neutral-900 pb-2">
                        <span class="text-5xl sm:text-6xl text-neutral-200 select-none font-light">{{ t.sample }}</span>
                        <span class="font-mono text-xs uppercase text-neutral-500">{{ t.category }}</span>
                      </div>
                      <div class="mt-4">
                        <h4 class="font-medium text-sm sm:text-base text-white">{{ t.name }}</h4>
                        <ul class="mt-2 flex flex-wrap gap-1.5 font-mono text-[11px] text-neutral-400">
                          @for (w of t.weights; track w) {
                            <li class="px-1.5 py-0.5 bg-neutral-900 rounded-xs">{{ w }}</li>
                          }
                        </ul>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Components Summary Card -->
              <div class="p-6 rounded-sm border border-neutral-900 bg-neutral-950/60 flex flex-col justify-between">
                <div>
                  <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Components</span>
                </div>
                <div class="my-6">
                  <p class="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                    {{ p.design.componentsSummary }}
                  </p>
                </div>
                <div class="pt-4 border-t border-neutral-900 font-mono text-xs text-neutral-500">
                  Reusable design system components built with Tailwind CSS & TypeScript.
                </div>
              </div>

              <!-- Cool Detail / Interactive Demo Card -->
              <div class="p-6 rounded-sm border border-neutral-900 bg-neutral-950/60 flex flex-col justify-between">
                <div>
                  <span class="font-mono text-xs uppercase tracking-wider text-[#d4ff00]">Interactive Detail</span>
                </div>
                <div class="my-6 space-y-2">
                  <h4 class="text-base sm:text-lg font-bold text-white">{{ p.design.interactiveDemoTitle }}</h4>
                  <p class="text-sm text-neutral-400 leading-relaxed">
                    {{ p.design.interactiveDemoDescription }}
                  </p>
                </div>
                <div class="p-4 rounded-xs border border-neutral-800 bg-black/40 font-mono text-xs text-neutral-400 flex items-center justify-between">
                  <span>Engine: WebGL / Shader pipeline</span>
                  <span class="text-[#d4ff00]">60 FPS</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Section: CODE -->
          <section class="mt-24 sm:mt-32" aria-labelledby="code-heading">
            <div class="flex items-center justify-between pb-6 border-b border-neutral-900">
              <h2 id="code-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Code
              </h2>
              <span class="font-mono text-[11px] text-neutral-600">ARCHITECTURE & IMPLEMENTATION</span>
            </div>

            <div class="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <!-- Technologies Card -->
              <div class="lg:col-span-4 p-6 rounded-sm border border-neutral-900 bg-neutral-950/60 flex flex-col justify-between">
                <div>
                  <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Technologies</span>
                  <ul class="mt-6 space-y-4">
                    @for (tech of p.code.technologies; track tech.name) {
                      <li class="border-b border-neutral-900/80 pb-3">
                        <a
                          [href]="tech.url"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="font-mono text-sm text-white hover:text-[#d4ff00] transition-colors flex items-center gap-1.5"
                        >
                          <span>{{ tech.name }}</span>
                          <span class="text-xs">↗</span>
                        </a>
                        <p class="mt-1 text-xs text-neutral-400 leading-snug">{{ tech.note }}</p>
                      </li>
                    }
                  </ul>
                </div>
                <p class="mt-6 font-mono text-xs text-neutral-500">
                  Clean dependencies & zero bloat.
                </p>
              </div>

              <!-- Architecture File Tree Explorer -->
              <div class="lg:col-span-4 p-6 rounded-sm border border-neutral-900 bg-neutral-950/60 flex flex-col justify-between">
                <div>
                  <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Architecture</span>
                  <p class="mt-1 text-xs text-neutral-500 font-mono">Click folder to expand / collapse</p>

                  <div class="mt-6 font-mono text-xs text-neutral-300 select-none max-h-80 overflow-y-auto">
                    @for (node of p.code.architecture; track node.name) {
                      <div class="space-y-1">
                        <button
                          type="button"
                          (click)="toggleFolder(node)"
                          class="flex items-center gap-2 py-1 text-left w-full hover:text-white cursor-pointer font-bold text-neutral-200"
                        >
                          <span>{{ node.expanded !== false ? '▼' : '▶' }}</span>
                          <span>📁 {{ node.name }}</span>
                        </button>

                        @if (node.expanded !== false && node.children) {
                          <div class="pl-4 space-y-1 border-l border-neutral-800 ml-2">
                            @for (sub of node.children; track sub.name) {
                              @if (sub.type === 'folder') {
                                <div>
                                  <button
                                    type="button"
                                    (click)="toggleFolder(sub)"
                                    class="flex items-center gap-1.5 py-0.5 text-left w-full hover:text-white cursor-pointer text-neutral-300"
                                  >
                                    <span>{{ sub.expanded !== false ? '▼' : '▶' }}</span>
                                    <span>📁 {{ sub.name }}</span>
                                  </button>
                                  @if (sub.expanded !== false && sub.children) {
                                    <div class="pl-4 space-y-1 border-l border-neutral-800 ml-2">
                                      @for (file of sub.children; track file.name) {
                                        <div class="py-0.5 text-neutral-400 hover:text-white flex items-center gap-1.5">
                                          <span>📄</span>
                                          <span>{{ file.name }}</span>
                                        </div>
                                      }
                                    </div>
                                  }
                                </div>
                              } @else {
                                <div class="py-0.5 text-neutral-400 hover:text-white flex items-center gap-1.5">
                                  <span>📄</span>
                                  <span>{{ sub.name }}</span>
                                </div>
                              }
                            }
                          </div>
                        }
                      </div>
                    }
                  </div>
                </div>
                <p class="mt-4 font-mono text-[11px] text-neutral-600">
                  Domain-driven directory modularity.
                </p>
              </div>

              <!-- Implementation Code Viewer -->
              <div class="lg:col-span-4 p-6 rounded-sm border border-neutral-900 bg-neutral-950/60 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between pb-3 border-b border-neutral-900">
                    <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Implementation</span>
                    @if (p.code.implementation.length > 1) {
                      <div class="flex gap-2">
                        @for (snippet of p.code.implementation; track snippet.filename; let i = $index) {
                          <button
                            type="button"
                            (click)="activeSnippetIdx.set(i)"
                            class="font-mono text-[10px] px-2 py-0.5 rounded-xs transition-colors cursor-pointer"
                            [class]="
                              activeSnippetIdx() === i
                                ? 'bg-neutral-800 text-white font-bold'
                                : 'text-neutral-500 hover:text-white'
                            "
                          >
                            {{ snippet.filename }}
                          </button>
                        }
                      </div>
                    }
                  </div>

                  @if (activeSnippet(); as snippet) {
                    <div class="mt-4">
                      <div class="flex items-center justify-between text-neutral-500 font-mono text-[10px] pb-2">
                        <span>{{ snippet.filename }}</span>
                        <span>{{ snippet.language }}</span>
                      </div>
                      <div class="rounded-xs border border-neutral-800/80 bg-black/60 p-3 max-h-72 overflow-x-auto overflow-y-auto font-mono text-xs leading-relaxed text-neutral-300">
                        <pre class="m-0"><code>{{ snippet.code }}</code></pre>
                      </div>
                    </div>
                  }
                </div>
                <p class="mt-4 font-mono text-[11px] text-neutral-600">
                  Production snippet with typed interfaces.
                </p>
              </div>
            </div>
          </section>

          <!-- Section: SHIP -->
          <section class="mt-24 sm:mt-32" aria-labelledby="ship-heading">
            <div class="flex items-center justify-between pb-6 border-b border-neutral-900">
              <h2 id="ship-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Ship
              </h2>
              <span class="font-mono text-[11px] text-neutral-600">DEPLOYMENT & INFRASTRUCTURE</span>
            </div>

            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              @for (sec of p.ship.sections; track sec.title) {
                <div class="p-6 sm:p-8 rounded-sm border border-neutral-900 bg-neutral-950/60 space-y-4">
                  <h3 class="text-xl font-bold tracking-tight text-white">{{ sec.title }}</h3>
                  <p class="text-base text-neutral-400 font-normal leading-relaxed">
                    {{ sec.text }}
                  </p>
                </div>
              }
            </div>
          </section>

          <!-- Project Navigation (Previous / Next) -->
          <div class="mt-24 sm:mt-32 pt-12 border-t border-neutral-900 flex items-center justify-between">
            @if (prevProject(); as prev) {
              <a
                [routerLink]="['/projects', prev.slug]"
                class="group flex flex-col items-start font-mono text-xs hover:text-white transition-colors"
              >
                <span class="text-neutral-500">← PREVIOUS</span>
                <span class="mt-1 text-sm sm:text-base font-bold text-neutral-300 group-hover:text-white font-sans">
                  {{ prev.title }}
                </span>
              </a>
            } @else {
              <div></div>
            }

            @if (nextProject(); as next) {
              <a
                [routerLink]="['/projects', next.slug]"
                class="group flex flex-col items-end font-mono text-xs hover:text-white transition-colors text-right"
              >
                <span class="text-neutral-500">NEXT →</span>
                <span class="mt-1 text-sm sm:text-base font-bold text-neutral-300 group-hover:text-white font-sans">
                  {{ next.title }}
                </span>
              </a>
            }
          </div>
        </div>

        <!-- Reusable Say Hello Footer -->
        <app-say-hello theme="dark" />
      </main>
    } @else {
      <!-- Project Not Found -->
      <main class="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8 text-center font-mono">
        <h1 class="text-4xl font-bold">Case Study Not Found</h1>
        <p class="mt-4 text-neutral-400 text-sm">The requested project could not be located.</p>
        <a routerLink="/" class="mt-6 px-4 py-2 border border-neutral-700 text-xs uppercase hover:border-white">
          ← Back to Projects
        </a>
      </main>
    }
  `,
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly content = inject(ContentService);

  readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  readonly project = computed(() => {
    const s = this.slug();
    return s ? this.content.getCaseStudy(s) : undefined;
  });

  readonly nextProject = computed(() => {
    const s = this.slug();
    return s ? this.content.getNextCaseStudy(s) : undefined;
  });

  readonly prevProject = computed(() => {
    const s = this.slug();
    return s ? this.content.getPreviousCaseStudy(s) : undefined;
  });

  readonly activeSnippetIdx = signal(0);
  readonly copiedColor = signal<string | null>(null);

  readonly activeSnippet = computed(() => {
    const p = this.project();
    if (!p || !p.code.implementation.length) return undefined;
    return p.code.implementation[this.activeSnippetIdx()] ?? p.code.implementation[0];
  });

  copyColor(hex: string) {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(hex).then(() => {
        this.copiedColor.set(hex);
        setTimeout(() => this.copiedColor.set(null), 2500);
      });
    }
  }

  toggleFolder(node: TreeNode) {
    node.expanded = node.expanded === false ? true : false;
  }
}
