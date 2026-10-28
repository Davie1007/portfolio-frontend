import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  readonly signedIn = signal(false);

  constructor() {
    if (!environment.apiBase) return;
    this.http
      .get<{ signedIn: boolean }>(`${environment.apiBase}/auth/me`, { withCredentials: true })
      .subscribe({
        next: (r) => this.signedIn.set(r.signedIn),
        error: () => this.signedIn.set(false),
      });
  }

  async login(email: string, password: string): Promise<boolean> {
    const url = `${environment.apiBase}/auth/login`;
    try {
      await new Promise<void>((resolve, reject) => {
        this.http
          .post<{ ok: boolean }>(
            url,
            { email, password },
            { withCredentials: true, observe: 'response' as any },
          )
          .subscribe({
            next: () => resolve(),
            error: (err) => reject(err),
          });
      });
      this.signedIn.set(true);
      return true;
    } catch (err: any) {
      // Log the server's actual reason so you can see it in DevTools → Console.
      console.error('[login failed]', err.status, err.error);
      this.signedIn.set(false);
      return false;
    }
  }

  async logout(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.http
        .post(`${environment.apiBase}/auth/logout`, {}, { withCredentials: true })
        .subscribe({ next: () => resolve(), error: () => resolve() });
    });
    this.signedIn.set(false);
  }
}

