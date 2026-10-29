import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { ContentService } from '../services/content.service';
import { ProjectCaseStudy } from '../content';

type Tab = 'overview' | 'funding' | 'donations' | 'testimonials' | 'work' | 'services' | 'settings';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-8 text-white">
      <!-- ============ OVERVIEW ============ -->
      @if (tab() === 'overview') {
        <!-- Metric Cards -->
        <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6">
            <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Case Studies</span>
            <p class="mt-2 font-mono text-3xl font-bold text-white">{{ content.caseStudies().length }}</p>
            <p class="mt-1 text-xs text-neutral-500 font-mono">Daniele Buser Blueprint</p>
          </div>
          <div class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6">
            <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Total Backers</span>
            <p class="mt-2 font-mono text-3xl font-bold text-white">{{ totalBackers() }}</p>
            <p class="mt-1 text-xs text-neutral-500 font-mono">Across all campaigns</p>
          </div>
          <div class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6">
            <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Total Raised</span>
            <p class="mt-2 font-mono text-3xl font-bold text-[#d4ff00]">\${{ totalRaised() }}</p>
            <p class="mt-1 text-xs text-neutral-500 font-mono">Goal funding</p>
          </div>
          <div class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6">
            <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Services Active</span>
            <p class="mt-2 font-mono text-3xl font-bold text-white">{{ content.services().length }}</p>
            <p class="mt-1 text-xs text-neutral-500 font-mono">Client offerings</p>
          </div>
        </section>

        <!-- Case Studies Quick Grid -->
        <section class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6">
          <div class="flex items-center justify-between pb-4 border-b border-neutral-900">
            <h2 class="font-mono text-xs uppercase tracking-widest text-neutral-400">Featured Case Studies</h2>
            <a routerLink="/admin/work" class="text-xs font-mono text-[#d4ff00] hover:underline">Edit all →</a>
          </div>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (c of content.caseStudies(); track c.slug) {
              <div class="p-4 rounded-sm border border-neutral-900 bg-neutral-900/40 flex items-start gap-4">
                <img [src]="c.image" [alt]="c.title" class="size-14 object-cover rounded-xs border border-neutral-800" />
                <div class="min-w-0 flex-1">
                  <h4 class="font-bold text-sm text-white truncate">{{ c.title }}</h4>
                  <p class="font-mono text-[11px] text-neutral-500">{{ c.category }} · {{ c.year }}</p>
                  <p class="mt-1 text-xs text-neutral-400 line-clamp-1">{{ c.summary }}</p>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Campaign Progress -->
        <section class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6">
          <h2 class="font-mono text-xs uppercase tracking-widest text-neutral-400">Campaigns</h2>
          <ul class="mt-4 space-y-4">
            @for (f of content.funding(); track f.id) {
              <li class="p-4 rounded-sm border border-neutral-900 bg-neutral-900/30">
                <div class="flex items-center justify-between text-xs font-mono">
                  <strong class="text-white">{{ f.title }}</strong>
                  <span class="text-neutral-400">
                    \${{ f.raised }} / \${{ f.goal }} · {{ pct(f) }}% · {{ f.backers }} backers
                  </span>
                </div>
                <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-900">
                  <div class="h-full bg-[#d4ff00]" [style.width.%]="pct(f)"></div>
                </div>
              </li>
            }
          </ul>
        </section>
      }

      <!-- ============ WORK / CASE STUDIES ============ -->
      @if (tab() === 'work') {
        <section class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold tracking-tight">Case Studies & Projects</h2>
              <p class="text-xs font-mono text-neutral-400 mt-1">Manage content, narratives, tech stacks, and showcase assets.</p>
            </div>
            <span class="font-mono text-xs text-neutral-500">{{ content.caseStudies().length }} total</span>
          </div>

          @for (c of content.caseStudies(); track c.slug; let i = $index) {
            <article class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6 sm:p-8 space-y-6">
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-900">
                <div class="flex items-center gap-3">
                  <span class="font-mono text-xs text-[#d4ff00]">0{{ i + 1 }}</span>
                  <h3 class="text-lg sm:text-xl font-bold text-white">{{ c.title }}</h3>
                  <span class="font-mono text-xs text-neutral-500">/projects/{{ c.slug }}</span>
                </div>
                <a [href]="'/projects/' + c.slug" target="_blank" class="font-mono text-xs text-neutral-400 hover:text-white flex items-center gap-1">
                  <span>Preview case study</span>
                  <span>↗</span>
                </a>
              </div>

              <!-- General Info Grid -->
              <div class="grid gap-4 sm:grid-cols-3">
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Title</span>
                  <input
                    class="field"
                    [value]="c.title"
                    (input)="patchCaseStudy(c.slug, 'title', $any($event.target).value)"
                  />
                </label>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Year</span>
                  <input
                    class="field"
                    [value]="c.year"
                    (input)="patchCaseStudy(c.slug, 'year', $any($event.target).value)"
                  />
                </label>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Category</span>
                  <input
                    class="field"
                    [value]="c.category"
                    (input)="patchCaseStudy(c.slug, 'category', $any($event.target).value)"
                  />
                </label>
              </div>

              <!-- Tags & Image -->
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Tags (comma-separated)</span>
                  <input
                    class="field"
                    [value]="c.tags.join(', ')"
                    (change)="updateTags(c.slug, $any($event.target).value)"
                  />
                </label>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Image Asset Path</span>
                  <input
                    class="field"
                    [value]="c.image"
                    (input)="patchCaseStudy(c.slug, 'image', $any($event.target).value)"
                  />
                </label>
              </div>

              <!-- Summary -->
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Summary / Card Pitch</span>
                <textarea
                  class="field"
                  rows="2"
                  [value]="c.summary"
                  (input)="patchCaseStudy(c.slug, 'summary', $any($event.target).value)"
                ></textarea>
              </label>

              <!-- Obsess Narrative -->
              <div class="p-4 rounded-sm border border-neutral-900 bg-neutral-900/30 space-y-4">
                <span class="font-mono text-xs uppercase tracking-wider text-neutral-400">Obsess Narrative Section</span>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Headline</span>
                  <input
                    class="field"
                    [value]="c.obsess.headline"
                    (input)="patchObsessHeadline(c.slug, $any($event.target).value)"
                  />
                </label>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Primary Story Paragraph</span>
                  <textarea
                    class="field"
                    rows="3"
                    [value]="c.obsess.paragraphs[0] || ''"
                    (input)="patchObsessParagraph(c.slug, 0, $any($event.target).value)"
                  ></textarea>
                </label>
              </div>

              <!-- Links -->
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Live Production URL</span>
                  <input
                    class="field"
                    [value]="c.href || ''"
                    (input)="patchCaseStudy(c.slug, 'href', $any($event.target).value)"
                    placeholder="https://..."
                  />
                </label>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>GitHub Repository URL</span>
                  <input
                    class="field"
                    [value]="c.githubUrl || ''"
                    (input)="patchCaseStudy(c.slug, 'githubUrl', $any($event.target).value)"
                    placeholder="https://github.com/..."
                  />
                </label>
              </div>
            </article>
          }
        </section>
      }

      <!-- ============ SETTINGS ============ -->
      @if (tab() === 'settings') {
        <section class="space-y-6">
          <div class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6 sm:p-8 space-y-6">
            <h3 class="text-xl font-bold tracking-tight">Identity & Coordinates</h3>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Name</span>
                <input
                  class="field"
                  [value]="content.site().name"
                  (input)="patchSite('name', $any($event.target).value)"
                />
              </label>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Role / Title</span>
                <input
                  class="field"
                  [value]="content.site().role"
                  (input)="patchSite('role', $any($event.target).value)"
                />
              </label>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Primary Email</span>
                <input
                  class="field"
                  [value]="content.site().email"
                  (input)="patchSite('email', $any($event.target).value)"
                />
              </label>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Location</span>
                <input
                  class="field"
                  [value]="content.site().location"
                  (input)="patchSite('location', $any($event.target).value)"
                />
              </label>
            </div>

            <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
              <span>Geographic Coordinates (Swiss Modernist Footer)</span>
              <input
                class="field"
                [value]="content.site().coordinates || ''"
                (input)="patchSite('coordinates', $any($event.target).value)"
              />
            </label>

            <div class="grid gap-4 sm:grid-cols-3">
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>LinkedIn URL</span>
                <input
                  class="field"
                  [value]="content.site().linkedin || ''"
                  (input)="patchSite('linkedin', $any($event.target).value)"
                />
              </label>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>GitHub URL</span>
                <input
                  class="field"
                  [value]="content.site().github || ''"
                  (input)="patchSite('github', $any($event.target).value)"
                />
              </label>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Resume Path</span>
                <input
                  class="field"
                  [value]="content.site().resume || ''"
                  (input)="patchSite('resume', $any($event.target).value)"
                />
              </label>
            </div>
          </div>
        </section>
      }

      <!-- ============ SERVICES ============ -->
      @if (tab() === 'services') {
        <section class="space-y-6">
          <h2 class="text-xl font-bold tracking-tight">Services & Offerings</h2>
          @for (s of content.services(); track $index; let i = $index) {
            <article class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6 space-y-4">
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Service Title</span>
                <input
                  class="field"
                  [value]="s.title"
                  (input)="patchService(i, 'title', $any($event.target).value)"
                />
              </label>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Description</span>
                <textarea
                  class="field"
                  rows="2"
                  [value]="s.text"
                  (input)="patchService(i, 'text', $any($event.target).value)"
                ></textarea>
              </label>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Outcome / Result Line</span>
                <input
                  class="field"
                  [value]="s.result"
                  (input)="patchService(i, 'result', $any($event.target).value)"
                />
              </label>
            </article>
          }
        </section>
      }

      <!-- ============ TESTIMONIALS ============ -->
      @if (tab() === 'testimonials') {
        <section class="space-y-6">
          <h2 class="text-xl font-bold tracking-tight">Client Testimonials</h2>
          @for (t of content.testimonials(); track $index; let i = $index) {
            <article class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6 space-y-4">
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Quote</span>
                <textarea
                  class="field"
                  rows="3"
                  [value]="t.quote"
                  (input)="patchTestimonial(i, 'quote', $any($event.target).value)"
                ></textarea>
              </label>
              <div class="grid gap-4 sm:grid-cols-2">
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Name</span>
                  <input
                    class="field"
                    [value]="t.name"
                    (input)="patchTestimonial(i, 'name', $any($event.target).value)"
                  />
                </label>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Role & Company</span>
                  <input
                    class="field"
                    [value]="t.role"
                    (input)="patchTestimonial(i, 'role', $any($event.target).value)"
                  />
                </label>
              </div>
            </article>
          }
        </section>
      }

      <!-- ============ FUNDING ============ -->
      @if (tab() === 'funding') {
        <section class="space-y-6">
          <h2 class="text-xl font-bold tracking-tight">Open Source & Project Funding</h2>
          @for (f of content.funding(); track f.id) {
            <article class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6 space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-neutral-900">
                <span class="font-bold text-white">{{ f.title }}</span>
                <span class="font-mono text-xs text-neutral-500">id: {{ f.id }}</span>
              </div>
              <div class="grid gap-4 sm:grid-cols-3">
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Goal ($)</span>
                  <input
                    class="field"
                    type="number"
                    [value]="f.goal"
                    (input)="patchFunding(f.id, 'goal', +$any($event.target).value)"
                  />
                </label>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Raised ($)</span>
                  <input
                    class="field"
                    type="number"
                    [value]="f.raised"
                    (input)="patchFunding(f.id, 'raised', +$any($event.target).value)"
                  />
                </label>
                <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                  <span>Backers</span>
                  <input
                    class="field"
                    type="number"
                    [value]="f.backers"
                    (input)="patchFunding(f.id, 'backers', +$any($event.target).value)"
                  />
                </label>
              </div>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Description</span>
                <input
                  class="field"
                  [value]="f.text"
                  (input)="patchFunding(f.id, 'text', $any($event.target).value)"
                />
              </label>
            </article>
          }
        </section>
      }

      <!-- ============ DONATIONS ============ -->
      @if (tab() === 'donations') {
        <section class="space-y-6">
          <h2 class="text-xl font-bold tracking-tight">Donations & Support Channels</h2>
          <div class="rounded-sm border border-neutral-900 bg-neutral-950/70 p-6 space-y-4">
            <h3 class="font-bold text-white text-base">M-Pesa Kenya</h3>
            <div class="grid gap-4 sm:grid-cols-3">
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Paybill</span>
                <input
                  class="field"
                  [value]="content.donations().mpesa.paybill || ''"
                  (input)="patchMpesa('paybill', $any($event.target).value)"
                />
              </label>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Till Number</span>
                <input
                  class="field"
                  [value]="content.donations().mpesa.till || ''"
                  (input)="patchMpesa('till', $any($event.target).value)"
                />
              </label>
              <label class="block space-y-1.5 text-xs font-mono uppercase text-neutral-400">
                <span>Account</span>
                <input
                  class="field"
                  [value]="content.donations().mpesa.account || ''"
                  (input)="patchMpesa('account', $any($event.target).value)"
                />
              </label>
            </div>
          </div>
        </section>
      }
    </div>
  `,
  styles: [
    `
      .field {
        width: 100%;
        padding: 0.65rem 0.85rem;
        border-radius: 0.125rem;
        background-color: #171717;
        border: 1px solid #262626;
        color: #ffffff;
        font-family: inherit;
        font-size: 0.875rem;
        outline: none;
        transition: border-color 0.15s ease-in-out;
      }
      .field:focus {
        border-color: #d4ff00;
      }
    `,
  ],
})
export class AdminDashboard {
  readonly content = inject(ContentService);
  private readonly router = inject(Router);

  readonly tab = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => {
        const seg = e.urlAfterRedirects.split('?')[0].split('/').filter(Boolean);
        return (seg[1] as Tab) || 'overview';
      }),
      startWith(this.readTabFromUrl()),
    ),
    { initialValue: this.readTabFromUrl() },
  );

  private readTabFromUrl(): Tab {
    const seg = this.router.url.split('?')[0].split('/').filter(Boolean);
    return (seg[1] as Tab) || 'overview';
  }

  readonly totalRaised = computed(() => this.content.funding().reduce((s, f) => s + f.raised, 0));
  readonly totalBackers = computed(() => this.content.funding().reduce((s, f) => s + f.backers, 0));

  pct(f: { goal: number; raised: number }) {
    return f.goal ? Math.min(100, Math.round((f.raised / f.goal) * 100)) : 0;
  }

  patchCaseStudy(slug: string, key: string, value: unknown) {
    this.content.patchCaseStudy(slug, { [key]: value } as any);
  }

  updateTags(slug: string, raw: string) {
    const tags = raw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    this.content.patchCaseStudy(slug, { tags });
  }

  patchObsessHeadline(slug: string, headline: string) {
    const cs = this.content.getCaseStudy(slug);
    if (!cs) return;
    this.content.patchCaseStudy(slug, {
      obsess: { ...cs.obsess, headline },
    });
  }

  patchObsessParagraph(slug: string, idx: number, text: string) {
    const cs = this.content.getCaseStudy(slug);
    if (!cs) return;
    const paragraphs = [...cs.obsess.paragraphs];
    paragraphs[idx] = text;
    this.content.patchCaseStudy(slug, {
      obsess: { ...cs.obsess, paragraphs },
    });
  }

  patchFunding(id: string, key: string, value: unknown) {
    this.content.patchFunding(id, { [key]: value } as any);
  }

  patchMpesa(key: 'paybill' | 'till' | 'account', value: string) {
    this.content.patchMpesa({ [key]: value });
  }

  patchTestimonial(idx: number, key: string, value: unknown) {
    this.content.patchTestimonial(idx, { [key]: value } as any);
  }

  patchService(idx: number, key: string, value: unknown) {
    this.content.patchService(idx, { [key]: value } as any);
  }

  patchSite(key: string, value: unknown) {
    this.content.patchSite({ [key]: value } as any);
  }
}
