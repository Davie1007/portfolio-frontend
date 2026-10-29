import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header
      class="pointer-events-none fixed top-0 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 p-4 sm:p-6 md:p-8 mix-blend-difference text-white"
    >
      <div class="flex w-full items-start justify-between">
        <!-- Brand / Identity -->
        <div class="pointer-events-auto flex shrink-0 items-start">
          <a
            routerLink="/"
            class="flex flex-col items-start select-none group text-left"
            [attr.aria-label]="site().name + ' - ' + site().role"
          >
            <span
              class="text-xs sm:text-sm md:text-base font-bold tracking-tight uppercase leading-tight"
            >
              {{ site().name }}
            </span>
            <p class="text-[10px] sm:text-xs text-neutral-400 font-mono tracking-wider">
              {{ site().role }}
            </p>
          </a>
        </div>

        <!-- Navigation Links -->
        <nav aria-label="Main navigation" class="pointer-events-auto select-none">
          <ul
            class="flex items-center gap-4 sm:gap-8 font-mono text-[11px] sm:text-xs uppercase tracking-wider"
          >
            <li>
              <a
                routerLink="/"
                routerLinkActive="font-bold underline decoration-2 underline-offset-4"
                [routerLinkActiveOptions]="{ exact: true }"
                class="inline-block py-1 text-neutral-300 hover:text-white transition-colors"
              >
                PROJECTS
              </a>
            </li>
            <li>
              <a
                routerLink="/about"
                routerLinkActive="font-bold underline decoration-2 underline-offset-4"
                class="inline-block py-1 text-neutral-300 hover:text-white transition-colors"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                routerLink="/contacts"
                routerLinkActive="font-bold underline decoration-2 underline-offset-4"
                class="inline-block py-1 text-neutral-300 hover:text-white transition-colors"
              >
                CONTACTS
              </a>
            </li>
            <li>
              <a
                routerLink="/donate"
                routerLinkActive="font-bold underline decoration-2 underline-offset-4"
                class="inline-block py-1 text-neutral-300 hover:text-white transition-colors"
              >
                SUPPORT
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
})
export class NavHeaderComponent {
  private readonly content = inject(ContentService);
  readonly site = this.content.site;
}
