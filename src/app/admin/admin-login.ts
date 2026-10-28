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
        <p class="mt-1 text-sm text-mute">Enter the password to edit site content.</p>

        <label class="mt-4 block text-sm">
          <span class="sr-only">Password</span>
          <input
            class="field"
            type="password"
            name="pw"
            placeholder="Password"
            aria-label="Admin password"
            autocomplete="current-password"
            [(ngModel)]="password"
            autofocus
          />
        </label>

        @if (error()) {
          <p class="mt-2 text-sm text-red-700" role="alert">{{ error() }}</p>
        }

        <button type="submit" class="btn btn-primary mt-4 w-full">Sign in</button>

        <p class="mt-4 text-xs text-mute">
          Client-side gate only — replace with real auth before launch.
        </p>
      </form>
    </div>
  `,
})
export class AdminLogin implements OnInit {
  password = '';
  readonly error = signal('');

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit() {
    if (this.auth.signedIn()) this.router.navigateByUrl('/admin');
  }

  submit() {
    if (!this.password) {
      this.error.set('Enter a password.');
      return;
    }
    if (this.auth.login(this.password)) {
      this.router.navigateByUrl('/admin');
      return;
    }
    this.error.set('Incorrect password.');
  }
}
