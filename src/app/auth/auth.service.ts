import { Injectable, signal } from '@angular/core';

// ⚠️ Client-side gate only. Anyone can read this from the bundle.
// Replace with a real backend session before using this admin on a public site.
const ADMIN_PASSWORD = 'change-me-before-launch';
const SESSION_KEY = 'dk-admin-session-v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly signedIn = signal(this.hasSession());

  private hasSession(): boolean {
    try {
      return localStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  }

  login(password: string): boolean {
    if (password !== ADMIN_PASSWORD) return false;
    try {
      localStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
    this.signedIn.set(true);
    return true;
  }

  logout() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    this.signedIn.set(false);
  }
}
