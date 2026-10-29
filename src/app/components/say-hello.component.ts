import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../services/content.service';
import { BackgroundGridComponent } from './background-grid.component';

@Component({
  selector: 'app-say-hello',
  standalone: true,
  imports: [RouterLink, BackgroundGridComponent],
  template: `
    <section
      id="contact"
      class="relative w-full overflow-hidden border-t"
      [class]="
        theme() === 'dark'
          ? 'bg-[#0a0a0a] text-white border-neutral-900'
          : 'bg-[#f7f7f7] text-[#0a0a0a] border-neutral-200'
      "
      aria-labelledby="say-hello-heading"
    >
      <app-background-grid [theme]="theme()" />

      <div
        class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 py-24 sm:py-32 md:py-40"
      >
        <!-- Giant Display Headline -->
        <div class="flex flex-col">
          <h2
            id="say-hello-heading"
            class="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.88] select-none"
          >
            Say<br />
            <span>Hello</span><span class="text-[#d4ff00]">.</span>
          </h2>
        </div>

        <!-- Contact Pitch and Email -->
        <div class="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div class="md:col-span-6 lg:col-span-5">
            <p
              class="text-base sm:text-lg md:text-xl font-normal leading-relaxed"
              [class]="theme() === 'dark' ? 'text-neutral-400' : 'text-neutral-600'"
            >
              If you have a project in mind, feel free to reach out — I'd be glad to help bring your
              vision to life.
            </p>
          </div>

          <div class="md:col-span-6 lg:col-span-7 flex flex-col md:items-end justify-between gap-6">
            <!-- Email with copy action -->
            <div class="flex flex-col md:items-end">
              <div class="flex items-center gap-3">
                <a
                  [href]="'mailto:' + site().email"
                  class="font-mono text-xl sm:text-2xl md:text-3xl font-medium tracking-tight hover:underline decoration-2 underline-offset-8 transition-colors"
                  [class]="theme() === 'dark' ? 'text-white' : 'text-[#0a0a0a]'"
                >
                  {{ site().email }}
                </a>
                <button
                  type="button"
                  (click)="copyEmail()"
                  class="cursor-pointer text-xs font-mono uppercase px-2.5 py-1 border rounded-sm transition-all"
                  [class]="
                    copied()
                      ? 'border-[#d4ff00] text-[#d4ff00] bg-[#d4ff00]/10'
                      : theme() === 'dark'
                        ? 'border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500'
                        : 'border-neutral-300 text-neutral-600 hover:text-black hover:border-neutral-400'
                  "
                  [attr.aria-label]="copied() ? 'Email copied' : 'Copy email address'"
                >
                  {{ copied() ? '✓ copied' : 'copy' }}
                </button>
              </div>
            </div>

            <!-- Social Links & Navigation -->
            <ul
              class="flex flex-wrap items-center gap-6 font-mono text-xs sm:text-sm uppercase tracking-wider"
            >
              @if (site().linkedin) {
                <li>
                  <a
                    [href]="site().linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline decoration-1 underline-offset-4 text-neutral-400 hover:text-white transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </li>
              }
              @if (site().github) {
                <li>
                  <a
                    [href]="site().github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline decoration-1 underline-offset-4 text-neutral-400 hover:text-white transition-colors"
                  >
                    GitHub ↗
                  </a>
                </li>
              }
              @if (site().resume) {
                <li>
                  <a
                    [href]="site().resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:underline decoration-1 underline-offset-4 text-neutral-400 hover:text-white transition-colors"
                  >
                    Resume ↗
                  </a>
                </li>
              }
              <li>
                <a
                  routerLink="/hire"
                  class="hover:underline decoration-1 underline-offset-4 text-[#d4ff00] font-bold"
                >
                  Hire me ↗
                </a>
              </li>
              <li>
                <a
                  routerLink="/donate"
                  class="hover:underline decoration-1 underline-offset-4 text-[#d4ff00] font-bold"
                >
                  Support ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Coordinates & Timestamp Footer -->
        <div
          class="mt-24 sm:mt-32 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] sm:text-xs"
          [class]="
            theme() === 'dark'
              ? 'border-neutral-900 text-neutral-500'
              : 'border-neutral-300 text-neutral-500'
          "
        >
          <div class="tracking-widest uppercase">
            {{ site().coordinates }}
          </div>
          <div>© {{ year }} {{ site().name }} — All Rights Reserved.</div>
        </div>
      </div>
    </section>
  `,
})
export class SayHelloComponent {
  theme = input<'dark' | 'light'>('dark');

  private readonly content = inject(ContentService);
  readonly site = this.content.site;
  readonly year = new Date().getFullYear();

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
}
