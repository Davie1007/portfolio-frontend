import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';
import { ContentService } from '../services/content.service';

type Tab = 'overview' | 'funding' | 'donations' | 'testimonials' | 'work' | 'services' | 'settings';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule],
  template: `
    <div class="space-y-6">
      <!-- ============ OVERVIEW ============ -->
      @if (tab() === 'overview') {
        <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border border-rule bg-white p-5">
            <p class="text-sm text-mute">Total raised</p>
            <p class="mt-1 font-display text-3xl font-semibold">\${{ totalRaised() }}</p>
          </div>
          <div class="rounded-xl border border-rule bg-white p-5">
            <p class="text-sm text-mute">Total backers</p>
            <p class="mt-1 font-display text-3xl font-semibold">{{ totalBackers() }}</p>
          </div>
          <div class="rounded-xl border border-rule bg-white p-5">
            <p class="text-sm text-mute">Campaigns funded</p>
            <p class="mt-1 font-display text-3xl font-semibold">
              {{ fundedCount() }} / {{ content.funding().length }}
            </p>
          </div>
          <div class="rounded-xl border border-rule bg-white p-5">
            <p class="text-sm text-mute">Work items</p>
            <p class="mt-1 font-display text-3xl font-semibold">{{ content.work().length }}</p>
          </div>
        </section>

        <section class="rounded-xl border border-rule bg-white p-5">
          <h2 class="font-display text-xl font-semibold">Campaign progress</h2>
          <ul class="mt-4 space-y-4">
            @for (f of content.funding(); track f.id) {
              <li>
                <div class="flex items-center justify-between text-sm">
                  <strong>{{ f.title }}</strong>
                  <span class="text-mute"
                    >\${{ f.raised }} / \${{ f.goal }} · {{ pct(f) }}% ·
                    {{ f.backers }} backers</span
                  >
                </div>
                <div class="mt-1 h-2 overflow-hidden rounded-full bg-paper">
                  <div class="h-2 bg-iris" [style.width.%]="pct(f)"></div>
                </div>
              </li>
            }
          </ul>
        </section>

        <section class="rounded-xl border border-rule bg-white p-5">
          <h2 class="font-display text-xl font-semibold">Recent changes</h2>
          <p class="mt-1 text-sm text-mute">
            Saved automatically to localStorage. Use Export JSON to snapshot.
          </p>
        </section>
      }

      <!-- ============ FUNDING ============ -->
      @if (tab() === 'funding') {
        <section class="space-y-4">
          @for (f of content.funding(); track f.id) {
            <article class="rounded-xl border border-rule bg-white p-5">
              <div class="flex items-center justify-between">
                <h3 class="font-display text-lg font-semibold">{{ f.title }}</h3>
                <span class="text-xs text-mute">id: {{ f.id }}</span>
              </div>
              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <label class="block text-sm">
                  <span class="text-mute">Title</span>
                  <input
                    class="field mt-1"
                    [value]="f.title"
                    (input)="patchFunding(f.id, 'title', $any($event.target).value)"
                  />
                </label>
                <label class="block text-sm">
                  <span class="text-mute">Updates line</span>
                  <input
                    class="field mt-1"
                    [value]="f.updates"
                    (input)="patchFunding(f.id, 'updates', $any($event.target).value)"
                  />
                </label>
                <label class="block text-sm sm:col-span-2">
                  <span class="text-mute">Description</span>
                  <input
                    class="field mt-1"
                    [value]="f.text"
                    (input)="patchFunding(f.id, 'text', $any($event.target).value)"
                  />
                </label>
                <label class="block text-sm">
                  <span class="text-mute">Raised (USD)</span>
                  <input
                    class="field mt-1"
                    type="number"
                    min="0"
                    [value]="f.raised"
                    (input)="patchFunding(f.id, 'raised', +$any($event.target).value)"
                  />
                </label>
                <label class="block text-sm">
                  <span class="text-mute">Goal (USD)</span>
                  <input
                    class="field mt-1"
                    type="number"
                    min="1"
                    [value]="f.goal"
                    (input)="patchFunding(f.id, 'goal', +$any($event.target).value)"
                  />
                </label>
                <label class="block text-sm">
                  <span class="text-mute">Backers</span>
                  <input
                    class="field mt-1"
                    type="number"
                    min="0"
                    [value]="f.backers"
                    (input)="patchFunding(f.id, 'backers', +$any($event.target).value)"
                  />
                </label>
              </div>
            </article>
          }
        </section>
      }

      <!-- ============ DONATIONS ============ -->
      @if (tab() === 'donations') {
        <section class="space-y-4">
          <article class="rounded-xl border border-rule bg-white p-5">
            <h3 class="font-display text-lg font-semibold">Section copy</h3>
            <label class="mt-3 block text-sm">
              <span class="text-mute">Heading</span>
              <input
                class="field mt-1"
                [value]="content.donations().heading"
                (input)="patchDonation('heading', $any($event.target).value)"
              />
            </label>
            <label class="mt-3 block text-sm">
              <span class="text-mute">Intro</span>
              <textarea
                class="field mt-1"
                rows="2"
                [value]="content.donations().intro"
                (input)="patchDonation('intro', $any($event.target).value)"
              ></textarea>
            </label>
          </article>

          <article class="rounded-xl border border-rule bg-white p-5">
            <h3 class="font-display text-lg font-semibold">M-Pesa details</h3>
            <p class="mt-1 text-sm text-mute">
              Only used when an M-Pesa channel is active. Leave blank to hide.
            </p>
            <div class="mt-3 grid gap-3 sm:grid-cols-3">
              <label class="block text-sm">
                <span class="text-mute">Paybill</span>
                <input
                  class="field mt-1"
                  [value]="content.donations().mpesa.paybill"
                  (input)="patchMpesa('paybill', $any($event.target).value)"
                />
              </label>
              <label class="block text-sm">
                <span class="text-mute">Till</span>
                <input
                  class="field mt-1"
                  [value]="content.donations().mpesa.till"
                  (input)="patchMpesa('till', $any($event.target).value)"
                />
              </label>
              <label class="block text-sm">
                <span class="text-mute">Account</span>
                <input
                  class="field mt-1"
                  [value]="content.donations().mpesa.account"
                  (input)="patchMpesa('account', $any($event.target).value)"
                />
              </label>
            </div>
          </article>

          <article class="rounded-xl border border-rule bg-white p-5">
            <h3 class="font-display text-lg font-semibold">Channels</h3>
            <ul class="mt-3 space-y-3">
              @for (c of content.donations().channels; track c.id) {
                <li class="rounded-lg border border-rule bg-paper p-4">
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium">{{ c.label }}</h4>
                    <label class="flex items-center gap-2 text-sm text-mute">
                      <input
                        type="checkbox"
                        [checked]="c.active"
                        (change)="patchChannel(c.id, 'active', $any($event.target).checked)"
                      />
                      Show on site
                    </label>
                  </div>
                  <div class="mt-3 grid gap-3 sm:grid-cols-2">
                    <label class="block text-sm">
                      <span class="text-mute">Label</span>
                      <input
                        class="field mt-1"
                        [value]="c.label"
                        (input)="patchChannel(c.id, 'label', $any($event.target).value)"
                      />
                    </label>
                    <label class="block text-sm">
                      <span class="text-mute">Description</span>
                      <input
                        class="field mt-1"
                        [value]="c.description"
                        (input)="patchChannel(c.id, 'description', $any($event.target).value)"
                      />
                    </label>
                    @if (c.kind === 'link') {
                      <label class="block text-sm sm:col-span-2">
                        <span class="text-mute">URL</span>
                        <input
                          class="field mt-1"
                          [value]="c.url"
                          (input)="patchChannel(c.id, 'url', $any($event.target).value)"
                        />
                      </label>
                    }
                  </div>
                </li>
              }
            </ul>
          </article>
        </section>
      }

      <!-- ============ TESTIMONIALS ============ -->
      @if (tab() === 'testimonials') {
        <section class="space-y-4">
          @for (t of content.testimonials(); track $index; let i = $index) {
            <article class="rounded-xl border border-rule bg-white p-5">
              <div class="flex items-center justify-between">
                <h3 class="font-display text-lg font-semibold">Testimonial {{ i + 1 }}</h3>
                <label class="flex items-center gap-2 text-sm text-mute">
                  <input
                    type="checkbox"
                    [checked]="t.placeholder"
                    (change)="patchTestimonial(i, 'placeholder', $any($event.target).checked)"
                  />
                  Placeholder
                </label>
              </div>
              <label class="mt-3 block text-sm">
                <span class="text-mute">Quote</span>
                <textarea
                  class="field mt-1"
                  rows="3"
                  [value]="t.quote"
                  (input)="patchTestimonial(i, 'quote', $any($event.target).value)"
                ></textarea>
              </label>
              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <label class="block text-sm">
                  <span class="text-mute">Name</span>
                  <input
                    class="field mt-1"
                    [value]="t.name"
                    (input)="patchTestimonial(i, 'name', $any($event.target).value)"
                  />
                </label>
                <label class="block text-sm">
                  <span class="text-mute">Role</span>
                  <input
                    class="field mt-1"
                    [value]="t.role"
                    (input)="patchTestimonial(i, 'role', $any($event.target).value)"
                  />
                </label>
              </div>
            </article>
          }
        </section>
      }

      <!-- ============ WORK ============ -->
      @if (tab() === 'work') {
        <section class="space-y-4">
          @for (w of content.work(); track $index; let i = $index) {
            <article class="rounded-xl border border-rule bg-white p-5">
              <h3 class="font-display text-lg font-semibold">{{ w.title || 'Untitled' }}</h3>
              <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <label class="block text-sm">
                  <span class="text-mute">Title</span>
                  <input
                    class="field mt-1"
                    [value]="w.title"
                    (input)="patchWork(i, 'title', $any($event.target).value)"
                  />
                </label>
                <label class="block text-sm">
                  <span class="text-mute">Stack</span>
                  <input
                    class="field mt-1"
                    [value]="w.stack"
                    (input)="patchWork(i, 'stack', $any($event.target).value)"
                  />
                </label>
                <label class="block text-sm sm:col-span-2">
                  <span class="text-mute">Description</span>
                  <textarea
                    class="field mt-1"
                    rows="2"
                    [value]="w.text"
                    (input)="patchWork(i, 'text', $any($event.target).value)"
                  ></textarea>
                </label>
                <label class="block text-sm">
                  <span class="text-mute">Image path</span>
                  <input
                    class="field mt-1"
                    [value]="w.image"
                    (input)="patchWork(i, 'image', $any($event.target).value)"
                  />
                </label>
                <label class="block text-sm">
                  <span class="text-mute">Image alt</span>
                  <input
                    class="field mt-1"
                    [value]="w.imageAlt"
                    (input)="patchWork(i, 'imageAlt', $any($event.target).value)"
                  />
                </label>
                <label class="block text-sm sm:col-span-2">
                  <span class="text-mute">Link (blank to hide)</span>
                  <input
                    class="field mt-1"
                    [value]="w.href"
                    (input)="patchWork(i, 'href', $any($event.target).value)"
                  />
                </label>
              </div>
            </article>
          }
        </section>
      }

      <!-- ============ SERVICES ============ -->
      @if (tab() === 'services') {
        <section class="space-y-4">
          @for (s of content.services(); track $index; let i = $index) {
            <article class="rounded-xl border border-rule bg-white p-5">
              <h3 class="font-display text-lg font-semibold">{{ s.title || 'Untitled' }}</h3>
              <label class="mt-3 block text-sm">
                <span class="text-mute">Title</span>
                <input
                  class="field mt-1"
                  [value]="s.title"
                  (input)="patchService(i, 'title', $any($event.target).value)"
                />
              </label>
              <label class="mt-3 block text-sm">
                <span class="text-mute">Description</span>
                <textarea
                  class="field mt-1"
                  rows="2"
                  [value]="s.text"
                  (input)="patchService(i, 'text', $any($event.target).value)"
                ></textarea>
              </label>
              <label class="mt-3 block text-sm">
                <span class="text-mute">Result line</span>
                <input
                  class="field mt-1"
                  [value]="s.result"
                  (input)="patchService(i, 'result', $any($event.target).value)"
                />
              </label>
            </article>
          }
        </section>
      }

      <!-- ============ SETTINGS ============ -->
      @if (tab() === 'settings') {
        <section class="space-y-6">
          <article class="rounded-xl border border-rule bg-white p-5">
            <h3 class="font-display text-lg font-semibold">Site info</h3>
            <div class="mt-3 grid gap-3 sm:grid-cols-2">
              <label class="block text-sm">
                <span class="text-mute">Name</span>
                <input
                  class="field mt-1"
                  [value]="content.site().name"
                  (input)="patchSite('name', $any($event.target).value)"
                />
              </label>
              <label class="block text-sm">
                <span class="text-mute">Email</span>
                <input
                  class="field mt-1"
                  type="email"
                  [value]="content.site().email"
                  (input)="patchSite('email', $any($event.target).value)"
                />
              </label>
              <label class="block text-sm sm:col-span-2">
                <span class="text-mute">Role line</span>
                <input
                  class="field mt-1"
                  [value]="content.site().role"
                  (input)="patchSite('role', $any($event.target).value)"
                />
              </label>
              <label class="block text-sm sm:col-span-2">
                <span class="text-mute">Location line</span>
                <input
                  class="field mt-1"
                  [value]="content.site().location"
                  (input)="patchSite('location', $any($event.target).value)"
                />
              </label>
              <label class="block text-sm sm:col-span-2">
                <span class="text-mute">API URL (blank = mailto fallback)</span>
                <input
                  class="field mt-1"
                  [value]="content.site().apiUrl"
                  (input)="patchSite('apiUrl', $any($event.target).value)"
                />
              </label>
            </div>
          </article>

          <article class="rounded-xl border border-rule bg-white p-5">
            <h3 class="font-display text-lg font-semibold">Discount tiers</h3>
            <p class="mt-1 text-sm text-mute">Pledge at or above “min” earns “off” % discount.</p>
            <ul class="mt-3 space-y-2">
              @for (t of content.tiers(); track $index; let i = $index) {
                <li class="flex flex-wrap items-end gap-2">
                  <label class="text-sm">
                    <span class="text-mute">Min (USD)</span>
                    <input
                      class="field mt-1 !w-28"
                      type="number"
                      min="1"
                      [value]="t.min"
                      (input)="patchTier(i, 'min', +$any($event.target).value)"
                    />
                  </label>
                  <label class="text-sm">
                    <span class="text-mute">Off (%)</span>
                    <input
                      class="field mt-1 !w-24"
                      type="number"
                      min="1"
                      max="100"
                      [value]="t.off"
                      (input)="patchTier(i, 'off', +$any($event.target).value)"
                    />
                  </label>
                </li>
              }
            </ul>
          </article>

          <article class="rounded-xl border border-rule bg-white p-5">
            <h3 class="font-display text-lg font-semibold">Pledge presets</h3>
            <label class="mt-2 block text-sm">
              <span class="text-mute">Comma-separated USD amounts</span>
              <input
                class="field mt-1"
                [value]="content.presets().join(', ')"
                (change)="setPresets($any($event.target).value)"
              />
            </label>
          </article>

          <article class="rounded-xl border border-rule bg-white p-5">
            <h3 class="font-display text-lg font-semibold">Pledge terms</h3>
            <ul class="mt-3 space-y-2">
              @for (t of content.terms(); track $index; let i = $index) {
                <li class="flex gap-2">
                  <input
                    class="field"
                    [value]="t"
                    (input)="setTerm(i, $any($event.target).value)"
                  />
                </li>
              }
            </ul>
          </article>
        </section>
      }
    </div>
  `,
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
  readonly fundedCount = computed(
    () => this.content.funding().filter((f) => f.raised >= f.goal).length,
  );

  pct(f: { goal: number; raised: number }) {
    return f.goal ? Math.min(100, Math.round((f.raised / f.goal) * 100)) : 0;
  }

  patchFunding(id: string, key: string, value: unknown) {
    this.content.patchFunding(id, { [key]: value } as any);
  }

  patchDonation(key: 'heading' | 'intro', value: string) {
    this.content.patchDonations({ [key]: value });
  }

  patchMpesa(key: 'paybill' | 'till' | 'account', value: string) {
    this.content.patchMpesa({ [key]: value });
  }

  patchChannel(
    id: string,
    key: 'label' | 'description' | 'url' | 'active',
    value: string | boolean,
  ) {
    this.content.patchDonationChannel(id, { [key]: value } as any);
  }

  patchTestimonial(idx: number, key: string, value: unknown) {
    this.content.patchTestimonial(idx, { [key]: value } as any);
  }

  patchWork(idx: number, key: string, value: unknown) {
    this.content.patchWork(idx, { [key]: value } as any);
  }

  patchService(idx: number, key: string, value: unknown) {
    this.content.patchService(idx, { [key]: value } as any);
  }

  patchSite(key: string, value: unknown) {
    this.content.patchSite({ [key]: value } as any);
  }

  patchTier(idx: number, key: string, value: unknown) {
    this.content.patchTier(idx, { [key]: value } as any);
  }

  setPresets(raw: string) {
    this.content.setPresets(
      raw
        .split(',')
        .map((s) => +s.trim())
        .filter((n) => Number.isFinite(n) && n > 0),
    );
  }

  setTerm(idx: number, value: string) {
    const terms = [...this.content.terms()];
    terms[idx] = value;
    this.content.setTerms(terms);
  }
}
