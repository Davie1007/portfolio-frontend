import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DatePipe],
  template: `
    <div class="min-h-screen bg-paper">
      <header class="border-b border-rule bg-white">
        <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div class="flex items-center gap-4">
            <strong class="font-display text-lg">Content admin</strong>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              class="text-sm underline underline-offset-4 hover:text-iris"
              >View site ↗</a
            >
          </div>
          <button
            type="button"
            class="text-sm underline underline-offset-4 hover:text-iris"
            (click)="logout()"
          >
            Sign out
          </button>
        </div>
        <nav class="mx-auto max-w-6xl px-5 pb-2">
          <ul class="flex flex-wrap gap-4 text-sm">
            @for (l of links; track l.path) {
              <li>
                <a
                  [routerLink]="l.path"
                  routerLinkActive="font-semibold underline decoration-iris underline-offset-4"
                  [routerLinkActiveOptions]="{ exact: l.exact }"
                  class="hover:text-iris"
                  >{{ l.label }}</a
                >
              </li>
            }
          </ul>
        </nav>
      </header>

      <main class="mx-auto max-w-6xl px-5 py-8">
        <div class="mb-4 flex items-center justify-between text-sm text-mute">
          <span>Last saved: {{ content.state().updatedAt | date: 'medium' }}</span>
          <div class="flex gap-3">
            <button
              type="button"
              class="underline underline-offset-4 hover:text-iris"
              (click)="exportJson()"
            >
              Export JSON
            </button>
            <button
              type="button"
              class="underline underline-offset-4 hover:text-iris"
              (click)="importJson()"
            >
              Import JSON
            </button>
            <button
              type="button"
              class="text-red-700 underline underline-offset-4 hover:text-red-800"
              (click)="reset()"
            >
              Reset to defaults
            </button>
          </div>
        </div>
        <router-outlet />
      </main>
    </div>
  `,
})
export class AdminLayout {
  readonly content = inject(ContentService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly links = [
    { path: '/admin', label: 'Overview', exact: true },
    { path: '/admin/funding', label: 'Funding', exact: false },
    { path: '/admin/donations', label: 'Donations', exact: false }, // ← NEW
    { path: '/admin/testimonials', label: 'Testimonials', exact: false },
    { path: '/admin/work', label: 'Work', exact: false },
    { path: '/admin/services', label: 'Services', exact: false },
    { path: '/admin/settings', label: 'Site settings', exact: false },
  ];

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
        alert('Imported.');
      } catch {
        alert('Invalid JSON file.');
      }
    };
    input.click();
  }

  reset() {
    if (confirm('Reset all content to the seeded defaults? This cannot be undone.')) {
      this.content.reset();
    }
  }
}
