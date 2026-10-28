import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContentService } from '../services/content.service';
import { SERVICES, STEPS, TESTIMONIALS, TRUST_STRIP } from '../content';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-hire',
  imports: [FormsModule],
  template: `
    <main id="main" class="hire">
      <header class="hire-header">
        <a href="/public" class="hire-back">← Back</a>
        <h1 class="hire-title">Hire me</h1>
        <p class="hire-sub">
          {{ trust.intro }}
        </p>
        <ul class="hire-trust">
          @for (t of trust.items; track t.label) {
            <li>{{ t.label }}</li>
          }
        </ul>
      </header>

      <section aria-labelledby="services-heading" class="hire-section">
        <h2 id="services-heading" class="hire-h2">What I build</h2>
        <ul class="hire-services">
          @for (s of services; track s.title) {
            <li>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
              <p class="hire-result">{{ s.result }}</p>
            </li>
          }
        </ul>
      </section>

      <section aria-labelledby="steps-heading" class="hire-section">
        <h2 id="steps-heading" class="hire-h2">How a project runs</h2>
        <ol class="hire-steps">
          @for (s of steps; track s.title; let n = $index) {
            <li>
              <span class="hire-step-num">{{ (n + 1).toString().padStart(2, '0') }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </li>
          }
        </ol>
      </section>

      <section aria-labelledby="testimonials-heading" class="hire-section">
        <h2 id="testimonials-heading" class="hire-h2">Clients</h2>
        <div class="hire-testimonials">
          @for (t of testimonials; track t.name) {
            <blockquote>
              <p>“{{ t.quote }}”</p>
              <footer>
                {{ t.name }}<span>, {{ t.role }}</span>
              </footer>
              @if (t.placeholder) {
                <p class="hire-placeholder">Sample testimonial.</p>
              }
            </blockquote>
          }
        </div>
      </section>

      <section aria-labelledby="contact-heading" class="hire-section">
        <h2 id="contact-heading" class="hire-h2">Start a project</h2>

        @if (sent()) {
          <p #success tabindex="-1" class="hire-success" role="status">
            @if (viaEmail()) {
              Thank you, {{ c().name }}. Your email app should have opened. Send it, or write to
              {{ site.email }}.
            } @else {
              Thank you, {{ c().name }}. I’ll be in touch within two working days.
            }
          </p>
        } @else {
          <form #cf (submit)="$event.preventDefault(); submit(cf)" novalidate class="hire-form">
            <label>
              <span>Name</span>
              <input
                class="field"
                name="n"
                required
                (input)="upd('name', $any($event.target).value)"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                class="field"
                name="e"
                type="email"
                required
                (input)="upd('email', $any($event.target).value)"
              />
            </label>
            <label>
              <span>What do you need?</span>
              <textarea
                class="field"
                rows="4"
                required
                (input)="upd('need', $any($event.target).value)"
              ></textarea>
            </label>
            <div class="hire-row">
              <label>
                <span>Budget</span>
                <select class="field" (change)="upd('budget', $any($event.target).value)">
                  <option>Not sure yet</option>
                  <option>Under $1,000</option>
                  <option>$1,000 – $5,000</option>
                  <option>$5,000 – $20,000</option>
                  <option>Over $20,000</option>
                </select>
              </label>
              <label>
                <span>Timeline</span>
                <select class="field" (change)="upd('timeline', $any($event.target).value)">
                  <option>Flexible</option>
                  <option>Within 1 month</option>
                  <option>1 – 3 months</option>
                  <option>3 months +</option>
                </select>
              </label>
            </div>
            <button class="hire-submit" [disabled]="busy()">
              {{ busy() ? 'Sending…' : 'Send enquiry' }}
            </button>
            @if (status()) {
              <p class="hire-error" role="alert">{{ status() }}</p>
            }
          </form>
        }
      </section>
    </main>
  `,
})
export class Hire {
  private readonly content = inject(ContentService);
  private readonly http = inject(HttpClient);

  readonly site = this.content.site();
  readonly services = SERVICES;
  readonly testimonials = TESTIMONIALS;
  readonly steps = STEPS;
  readonly trust = TRUST_STRIP;

  readonly c = signal({
    name: '',
    email: '',
    need: '',
    budget: 'Not sure yet',
    timeline: 'Flexible',
  });
  readonly sent = signal(false);
  readonly viaEmail = signal(false);
  readonly busy = signal(false);
  readonly status = signal('');

  @ViewChild('success') success?: ElementRef<HTMLElement>;

  upd(key: 'name' | 'email' | 'need' | 'budget' | 'timeline', v: string) {
    this.c.update((o) => ({ ...o, [key]: v }));
  }

  async submit(form?: HTMLFormElement) {
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.busy.set(true);
    this.status.set('');
    try {
      if (environment.apiBase) {
        await firstValueFrom(
          this.http.post(`${environment.apiBase}/contact`, this.c(), { withCredentials: true }),
        );
      } else {
        this.viaEmail.set(true);
        const body = Object.entries(this.c())
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n');
        location.href = `mailto:${this.site.email}?subject=${encodeURIComponent(
          'New project enquiry',
        )}&body=${encodeURIComponent(body)}`;
      }
      this.sent.set(true);
      requestAnimationFrame(() => this.success?.nativeElement.focus());
    } catch {
      this.status.set('Sending failed. Please email me directly.');
    }
    this.busy.set(false);
  }
}
