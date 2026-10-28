import { Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentService } from '../services/content.service';
import { environment } from '../../environments/environment';

type DonationChannel = ReturnType<ContentService['donations']>['channels'][number];

@Component({
  selector: 'app-donate',
  template: `
    @if (activeChannels().length) {
      <section
        aria-labelledby="donate-heading"
        class="mt-12 rounded-2xl border border-rule bg-paper p-6"
      >
        <h3 id="donate-heading" class="font-display text-2xl font-semibold">
          {{ config().heading }}
        </h3>
        <p class="mt-2 max-w-2xl text-mute">{{ config().intro }}</p>

        <ul class="mt-6 grid gap-3 sm:grid-cols-2">
          @for (c of activeChannels(); track c.id) {
            <li class="rounded-xl border border-rule bg-white p-4">
              <p class="font-medium">{{ c.label }}</p>
              <p class="mt-1 text-sm text-mute">{{ c.description }}</p>

              @if (c.kind === 'link' && c.url) {
                <a
                  [href]="c.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary mt-3 block text-center"
                  (click)="onTipClick(c)"
                >
                  Tip via {{ c.label }} ↗
                </a>
              } @else if (c.kind === 'mpesa') {
                <div class="mt-3 rounded-md border border-rule bg-paper p-3 text-sm">
                  @if (config().mpesa.paybill) {
                    <p>
                      Paybill: <strong>{{ config().mpesa.paybill }}</strong>
                    </p>
                  }
                  @if (config().mpesa.till) {
                    <p>
                      Till: <strong>{{ config().mpesa.till }}</strong>
                    </p>
                  }
                  @if (config().mpesa.account) {
                    <p>
                      Account: <strong>{{ config().mpesa.account }}</strong>
                    </p>
                  }
                </div>
              }
            </li>
          }
        </ul>

        <p class="mt-4 text-xs text-mute">
          Donations are gifts — no discount code, no follow-up, no expectation. Thank you.
        </p>

        @if (thanked()) {
          <p class="mt-3 text-sm text-ok" role="status">{{ thanked() }}</p>
        }
      </section>
    }
  `,
})
export class DonateComponent {
  private readonly content = inject(ContentService);
  private readonly http = inject(HttpClient);

  readonly config = this.content.donations;
  readonly thanked = signal('');

  /** Channels that are both marked active and valid (link has url, or mpesa has details). */
  readonly activeChannels = computed<DonationChannel[]>(() =>
    this.config().channels.filter((c) => {
      if (!c.active) return false;
      if (c.kind === 'link') return !!c.url;
      if (c.kind === 'mpesa') {
        const m = this.config().mpesa;
        return !!(m.paybill || m.till);
      }
      return false;
    }),
  );

  onTipClick(channel: DonationChannel) {
    if (!environment.apiBase) return;
    this.http
      .post(
        `${environment.apiBase}/donations/record`,
        {
          channel: channel.id,
          amount_cents: 0,
          currency: 'USD',
          status: 'clicked',
        },
        { withCredentials: true },
      )
      .subscribe({
        next: () => {
          this.thanked.set('Thanks for considering a tip — every bit helps.');
          setTimeout(() => this.thanked.set(''), 6000);
        },
        error: () => {
        },
      });
  }
}
