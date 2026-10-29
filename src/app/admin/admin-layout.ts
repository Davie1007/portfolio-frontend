import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DatePipe],
  template: `
    <div class="min-h-screen bg-[#0a0a0a] text-white">
      <!-- Fixed Admin Header -->
      <header class="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#0a0a0a]/95 backdrop-blur-md">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          <!-- Left: Identity & Live Site Link -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="size-2 rounded-full bg-[#d4ff00] animate-pulse"></span>
              <strong class="font-mono text-sm tracking-wider uppercase">DK // Admin</strong>
            </div>
            <span class="text-neutral-700">|</span>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              class="font-mono text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>View live site</span>
              <span>↗</span>
            </a>
          </div>

          <!-- Right: Save Action & Sign out -->
          <div class="flex items-center gap-3">
            <button
              type="button"
              (click)="save()"
              [disabled]="saving()"
              class="cursor-pointer font-mono text-xs uppercase px-4 py-2 rounded-sm bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-bold tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              @if (saving()) {
                <span class="inline-block size-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                <span>Saving…</span>
              } @else {
                <span>Save to server</span>
              }
            </button>

            <button
              type="button"
              (click)="logout()"
              class="cursor-pointer font-mono text-xs uppercase px-3 py-2 rounded-sm border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="mx-auto max-w-7xl px-4 sm:px-6 border-t border-neutral-900 overflow-x-auto">
          <ul class="flex items-center gap-1 py-1.5 font-mono text-xs whitespace-nowrap">
            @for (l of links; track l.path) {
              <li>
                <a
                  [routerLink]="l.path"
                  routerLinkActive="bg-neutral-800 text-white font-bold"
                  [routerLinkActiveOptions]="{ exact: l.exact }"
                  class="inline-block px-3 py-1.5 rounded-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
                >
                  {{ l.label }}
                </a>
              </li>
            }
          </ul>
        </nav>
      </header>

      <!-- Main Content Container -->
      <main class="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <!-- Status Bar & Data Actions -->
        <div class="mb-8 p-4 rounded-sm border border-neutral-900 bg-neutral-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div class="flex items-center gap-3 text-neutral-400">
            <span class="text-neutral-500">Last synchronized:</span>
            <span class="text-white">{{ content.state().updatedAt | date: 'medium' }}</span>
            @if (saved()) {
              <span class="text-[#d4ff00] font-bold">✓ {{ saved() }}</span>
            }
            @if (saveError()) {
              <span class="text-red-400 font-bold">✕ {{ saveError() }}</span>
            }
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              (click)="exportJson()"
              class="hover:text-white text-neutral-400 underline underline-offset-4 cursor-pointer"
            >
              Export JSON
            </button>
            <span class="text-neutral-800">·</span>
            <button
              type="button"
              (click)="importJson()"
              class="hover:text-white text-neutral-400 underline underline-offset-4 cursor-pointer"
            >
              Import JSON
            </button>
            <span class="text-neutral-800">·</span>
            <button
              type="button"
              (click)="reset()"
              class="text-red-400 hover:text-red-300 underline underline-offset-4 cursor-pointer"
            >
              Reset defaults
            </button>
          </div>
        </div>

        <!-- Tab View Outlet -->
        <router-outlet />

        <!-- Floating Quick Save Trigger for long tabs -->
        <div class="mt-12 pt-8 border-t border-neutral-900 flex items-center justify-between">
          <p class="font-mono text-xs text-neutral-500">
            Remember to click "Save to server" to push content changes to the production API.
          </p>

          <button
            type="button"
            (click)="save()"
            [disabled]="saving()"
            class="cursor-pointer font-mono text-xs uppercase px-5 py-2.5 rounded-sm bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-bold tracking-wider transition-colors disabled:opacity-50"
          >
            {{ saving() ? 'Saving…' : 'Save all changes' }}
          </button>
        </div>
      </main>
    </div>
  `,
})
export class AdminLayout {
  readonly content = inject(ContentService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly saving = signal(false);
  readonly saved = signal('');
  readonly saveError = signal('');

  readonly links = [
    { path: '/admin', label: 'Overview', exact: true },
    { path: '/admin/work', label: 'Projects & Case Studies', exact: false },
    { path: '/admin/settings', label: 'Site & Profile', exact: false },
    { path: '/admin/services', label: 'Services', exact: false },
    { path: '/admin/testimonials', label: 'Testimonials', exact: false },
    { path: '/admin/funding', label: 'Funding', exact: false },
    { path: '/admin/donations', label: 'Donations', exact: false },
  ];

  async save() {
    this.saving.set(true);
    this.saved.set('');
    this.saveError.set('');
    try {
      await this.content.push();
      this.saved.set('Saved to server at ' + new Date().toLocaleTimeString());
      setTimeout(() => this.saved.set(''), 4000);
    } catch {
      this.saveError.set('Save failed. Ensure you are authenticated.');
      setTimeout(() => this.saveError.set(''), 4000);
    } finally {
      this.saving.set(false);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/admin/login');
  }

  exportJson() {
    const blob = new Blob([this.content.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `site-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importJson() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        this.content.importJson(await file.text());
        alert('Content imported successfully.');
      } catch {
        alert('Invalid JSON content file.');
      }
    };
    input.click();
  }

  reset() {
    if (confirm('Reset all site content to the seeded defaults? This cannot be undone.')) {
      this.content.reset();
    }
  }
}
