import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  template: `
    <div class="grid min-h-screen place-items-center bg-obsidian px-5">
      <form
        (submit)="$event.preventDefault(); submit()"
        class="w-full max-w-sm rounded-2xl bg-white p-6 text-ink shadow-2xl"
      >
        <h1 class="font-display text-2xl font-semibold">Admin access</h1>
        <p class="mt-1 text-sm text-mute">Sign in to edit site content.</p>

        <label class="mt-4 block text-sm">
          <span class="text-mute">Email</span>
          <input
            class="field mt-1"
            type="email"
            name="email"
            autocomplete="username"
            [(ngModel)]="email"
            required
          />
        </label>

        <label class="mt-3 block text-sm">
          <span class="text-mute">Password</span>
          <input
            class="field mt-1"
            type="password"
            name="pw"
            autocomplete="current-password"
            [(ngModel)]="password"
            required
            autofocus
          />
        </label>

        @if (error()) {
          <p class="mt-2 text-sm text-red-700" role="alert">{{ error() }}</p>
        }

        <button type="submit" class="btn btn-primary mt-4 w-full" [disabled]="busy()">
          {{ busy() ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
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
    if (this.auth.signedIn()) this.router.navigateByUrl('/admin');
  }

  async submit() {
    if (!this.email || !this.password) {
      this.error.set('Enter email and password.');
      return;
    }
    this.busy.set(true);
    const ok = await this.auth.login(this.email, this.password);
    this.busy.set(false);
    if (ok) {
      this.router.navigateByUrl('/admin');
    } else {
      this.error.set('Incorrect email or password.');
    }
  }
}
