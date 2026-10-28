import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-donate',
  imports: [CommonModule],
  template: `
    @if (config().channels.length) {
      <section
        aria-labelledby="donate-heading"
        class="mt-12 rounded-2xl border border-rule bg-paper p-6"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="max-w-2xl">
            <h3 id="donate-heading" class="font-display text-2xl font-semibold">
              {{ config().heading }}
            </h3>
            <p class="mt-2 text-mute">{{ config().intro }}</p>
          </div>
        </div>

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
                  class="btn btn-primary mt-3 w-full text-center"
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
      </section>
    }
  `,
})
export class DonateComponent {
  private readonly content = inject(ContentService);

  readonly config = this.content.donations;

  readonly activeChannels = computed(() =>
    this.config().channels.filter((c) => c.active && (c.kind === 'mpesa' || !!c.url)),
  );
}
