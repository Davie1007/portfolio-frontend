import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavHeaderComponent } from '../components/nav-header.component';
import { BackgroundGridComponent } from '../components/background-grid.component';
import { ContentService } from '../services/content.service';
import { SeoService } from '../services/seo.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, NavHeaderComponent, BackgroundGridComponent],
  template: `
    <app-nav-header />

    <main class="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden pt-32 sm:pt-40 md:pt-48">
      <app-background-grid theme="dark" />

      <div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 pb-32">
        <!-- Giant Say Hello Headline -->
        <header class="flex flex-col">
          <h1 class="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.88] select-none">
            Say<br />
            <span>Hello</span><span class="text-[#d4ff00]">.</span>
          </h1>
          <p class="mt-8 text-lg sm:text-xl md:text-2xl font-light text-neutral-300 max-w-2xl leading-relaxed">
            If you have a project in mind, feel free to reach out — I'd be glad to help bring your vision to life.
          </p>
        </header>

        <div class="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <!-- Direct Contact & Coordinates -->
          <div class="lg:col-span-5 flex flex-col gap-10">
            <div class="space-y-3">
              <span class="font-mono text-xs uppercase tracking-widest text-neutral-500">Direct Email</span>
              <div class="flex items-center gap-3">
                <a
                  [href]="'mailto:' + site().email"
                  class="font-mono text-xl sm:text-2xl font-medium tracking-tight hover:underline decoration-1 underline-offset-4"
                >
                  {{ site().email }}
                </a>
                <button
                  type="button"
                  (click)="copyEmail()"
                  class="cursor-pointer text-xs font-mono uppercase px-2.5 py-1 border border-neutral-800 rounded-sm hover:border-neutral-600 transition-colors"
                  [class.text-[#d4ff00]]="copied()"
                >
                  {{ copied() ? '✓ copied' : 'copy' }}
                </button>
              </div>
            </div>

            <!-- Social Links -->
            <div class="space-y-3">
              <span class="font-mono text-xs uppercase tracking-widest text-neutral-500">Connect</span>
              <ul class="flex flex-col gap-2 font-mono text-sm">
                @if (site().linkedin) {
                  <li>
                    <a
                      [href]="site().linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-neutral-300 hover:text-white hover:underline transition-colors"
                    >
                      LinkedIn (opens in new tab) ↗
                    </a>
                  </li>
                }
                @if (site().github) {
                  <li>
                    <a
                      [href]="site().github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-neutral-300 hover:text-white hover:underline transition-colors"
                    >
                      GitHub (opens in new tab) ↗
                    </a>
                  </li>
                }
                @if (site().resume) {
                  <li>
                    <a
                      [href]="site().resume"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-neutral-300 hover:text-white hover:underline transition-colors"
                    >
                      Resume / Curriculum Vitae ↗
                    </a>
                  </li>
                }
              </ul>
            </div>

            <!-- Location Coordinates -->
            <div class="space-y-2 pt-6 border-t border-neutral-900">
              <span class="font-mono text-xs uppercase tracking-widest text-neutral-500">Location</span>
              <p class="font-mono text-xs sm:text-sm text-neutral-400">
                {{ site().coordinates }}
              </p>
            </div>
          </div>

          <!-- Reach Out Message Form -->
          <div class="lg:col-span-7 rounded-sm border border-neutral-900 bg-neutral-950/60 p-6 sm:p-8 md:p-10">
            <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
              Start a Conversation
            </h2>

            @if (submitted()) {
              <div class="p-6 rounded-sm border border-[#d4ff00]/30 bg-[#d4ff00]/5 text-center space-y-3">
                <p class="font-mono text-sm text-[#d4ff00] font-semibold">Message Sent Successfully</p>
                <p class="text-sm text-neutral-300">
                  Thanks for reaching out! I typically reply within 24 hours.
                </p>
                <button
                  type="button"
                  (click)="submitted.set(false)"
                  class="mt-4 text-xs font-mono uppercase underline text-neutral-400 hover:text-white"
                >
                  Send another message
                </button>
              </div>
            } @else {
              <form (ngSubmit)="send()" class="space-y-6">
                @if (error()) {
                  <p class="p-3 text-xs font-mono text-red-400 border border-red-900/50 bg-red-950/20 rounded-sm">
                    {{ error() }}
                  </p>
                }

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label class="block space-y-2 text-xs font-mono uppercase text-neutral-400">
                    <span>Your Name *</span>
                    <input
                      type="text"
                      name="name"
                      [(ngModel)]="form.name"
                      required
                      placeholder="Jane Doe"
                      class="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4ff00] text-sm font-sans"
                    />
                  </label>
                  <label class="block space-y-2 text-xs font-mono uppercase text-neutral-400">
                    <span>Your Email *</span>
                    <input
                      type="email"
                      name="email"
                      [(ngModel)]="form.email"
                      required
                      placeholder="jane@company.com"
                      class="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4ff00] text-sm font-sans"
                    />
                  </label>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label class="block space-y-2 text-xs font-mono uppercase text-neutral-400">
                    <span>Estimated Budget</span>
                    <input
                      type="text"
                      name="budget"
                      [(ngModel)]="form.budget"
                      placeholder="$2,500 – $10,000"
                      class="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4ff00] text-sm font-sans"
                    />
                  </label>
                  <label class="block space-y-2 text-xs font-mono uppercase text-neutral-400">
                    <span>Timeline</span>
                    <input
                      type="text"
                      name="timeline"
                      [(ngModel)]="form.timeline"
                      placeholder="e.g. 4–6 weeks"
                      class="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4ff00] text-sm font-sans"
                    />
                  </label>
                </div>

                <label class="block space-y-2 text-xs font-mono uppercase text-neutral-400">
                  <span>Project Overview & Requirements *</span>
                  <textarea
                    name="need"
                    [(ngModel)]="form.need"
                    required
                    rows="4"
                    placeholder="Tell me about what you are building, existing systems, or your key business objective..."
                    class="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4ff00] text-sm font-sans"
                  ></textarea>
                </label>

                <button
                  type="submit"
                  [disabled]="busy() || !form.name || !form.email || !form.need"
                  class="cursor-pointer w-full py-3.5 px-6 rounded-sm bg-white hover:bg-[#d4ff00] text-black font-mono text-xs uppercase font-bold tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {{ busy() ? 'Sending inquiry...' : 'Send Message →' }}
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </main>
  `,
})
export class ContactsComponent {
  private readonly http = inject(HttpClient);
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  readonly site = this.content.site;

  constructor() {
    this.seo.updateMetadata({
      title: 'Contact | David Karanja — Creative Developer & Systems Engineer',
      description:
        'Available for creative development, interactive 3D web applications, ERP integrations, and high-performance engineering consultancy. Contact David Karanja.',
      canonicalUrl: 'https://karanjadavid.com/contacts',
      keywords:
        'David Karanja, Contact, Hire Creative Developer, Full-Stack Engineer, Thika Kenya, WebGL, Laravel, Freelance Software Engineer',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact David Karanja',
        url: 'https://karanjadavid.com/contacts',
        description:
          'Contact David Karanja for creative development, interactive 3D web configurators, and enterprise ERP deployments.',
        mainEntity: {
          '@type': 'Person',
          name: 'David Karanja',
          email: 'hello@karanjadavid.com',
          jobTitle: 'Creative Developer & Systems Engineer',
          url: 'https://karanjadavid.com',
        },
      },
    });
  }

  readonly form = {
    name: '',
    email: '',
    need: '',
    budget: '',
    timeline: '',
  };

  readonly busy = signal(false);
  readonly submitted = signal(false);
  readonly error = signal('');
  readonly copied = signal(false);

  copyEmail() {
    const email = this.site().email;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2500);
      });
    }
  }

  send() {
    if (!this.form.name || !this.form.email || !this.form.need) return;

    this.busy.set(true);
    this.error.set('');

    this.http.post(`${environment.apiBase}/contact`, this.form).subscribe({
      next: () => {
        this.busy.set(false);
        this.submitted.set(true);
        this.form.name = '';
        this.form.email = '';
        this.form.need = '';
        this.form.budget = '';
        this.form.timeline = '';
      },
      error: (err) => {
        this.busy.set(false);
        this.error.set(
          err?.error?.message || 'Could not send message. Please email directly.',
        );
      },
    });
  }
}
