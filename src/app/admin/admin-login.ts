import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen grid place-items-center bg-[#0a0a0a] text-white px-4">
      <div class="w-full max-w-md rounded-sm border border-neutral-800 bg-neutral-950/80 p-8 sm:p-10 shadow-2xl">
        <!-- Brand Header -->
        <div class="flex items-center gap-2 mb-2">
          <span class="size-2 rounded-full bg-[#d4ff00]"></span>
          <span class="font-mono text-xs text-neutral-400 uppercase tracking-widest">Secure Access</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">Content Admin</h1>
        <p class="mt-2 text-sm text-neutral-400 leading-relaxed font-normal">
          Sign in to update project case studies, philosophy, and system configurations.
        </p>

        <!-- Form -->
        <form (ngSubmit)="submit()" class="mt-8 space-y-5">
          <label class="block space-y-2 text-xs font-mono uppercase text-neutral-400">
            <span>Admin Email</span>
            <input
              type="email"
              name="email"
              autocomplete="username"
              [(ngModel)]="email"
              required
              placeholder="karanjadavid1007@gmail.com"
              class="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4ff00] text-sm font-sans"
            />
          </label>

          <label class="block space-y-2 text-xs font-mono uppercase text-neutral-400">
            <span>Password</span>
            <input
              type="password"
              name="password"
              autocomplete="current-password"
              [(ngModel)]="password"
              required
              placeholder="••••••••"
              class="w-full px-3.5 py-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#d4ff00] text-sm font-sans"
            />
          </label>

          @if (error()) {
            <div class="p-3 text-xs font-mono text-red-400 border border-red-900/50 bg-red-950/20 rounded-sm leading-relaxed" role="alert">
              {{ error() }}
            </div>
          }

          <button
            type="submit"
            [disabled]="busy() || !email || !password"
            class="cursor-pointer w-full py-3 px-4 rounded-sm bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-mono text-xs uppercase font-bold tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            @if (busy()) {
              <span class="inline-block size-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              <span>Authenticating…</span>
            } @else {
              <span>Sign in to Dashboard →</span>
            }
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-neutral-900 text-center font-mono text-[11px] text-neutral-600">
          <a href="/" class="hover:text-neutral-400 transition-colors">← Back to Portfolio</a>
        </div>
      </div>
    </div>
  `,
})
export class AdminLogin implements OnInit {
  email = '';
  password = '';
  readonly error = signal('');
  readonly busy = signal(false);

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    if (this.auth.signedIn()) {
      this.router.navigateByUrl('/admin');
    }
  }

  async submit() {
    if (!this.email || !this.password) {
      this.error.set('Enter email and password.');
      return;
    }
    this.busy.set(true);
    this.error.set('');
    const res = await this.auth.login(this.email, this.password);
    this.busy.set(false);
    if (res.ok) {
      this.router.navigateByUrl('/admin');
    } else {
      this.error.set(res.message || 'Incorrect email or password.');
    }
  }
}
