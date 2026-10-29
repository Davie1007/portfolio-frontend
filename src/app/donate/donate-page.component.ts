import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavHeaderComponent } from '../components/nav-header.component';
import { BackgroundGridComponent } from '../components/background-grid.component';
import { SayHelloComponent } from '../components/say-hello.component';
import { ContentService } from '../services/content.service';
import { SeoService } from '../services/seo.service';
import { environment } from '../../environments/environment';

type DonationChannel = ReturnType<ContentService['donations']>['channels'][number];
type FundingCampaign = ReturnType<ContentService['funding']>[number];

@Component({
  selector: 'app-donate-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavHeaderComponent, BackgroundGridComponent, SayHelloComponent],
  template: `
    <app-nav-header />

    <main class="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden pt-32 sm:pt-40 md:pt-48">
      <app-background-grid theme="dark" />

      <div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 pb-32">
        <!-- Hero Headline -->
        <header class="flex flex-col">
          <h1 class="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-[0.88] select-none">
            Support<br />
            <span>the work</span><span class="text-[#d4ff00]">.</span>
          </h1>
          <p class="mt-8 text-lg sm:text-xl md:text-2xl font-light text-neutral-300 max-w-2xl leading-relaxed">
            {{ config().intro }}
          </p>
        </header>

        <!-- Live Stats Bar -->
        <section class="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" aria-label="Funding statistics">
          <div class="p-4 sm:p-6 rounded-sm border border-neutral-900 bg-neutral-950/60">
            <span class="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500">Total Raised</span>
            <p class="mt-2 font-mono text-2xl sm:text-3xl font-bold text-[#d4ff00]">\${{ totalRaised() }}</p>
          </div>
          <div class="p-4 sm:p-6 rounded-sm border border-neutral-900 bg-neutral-950/60">
            <span class="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500">Backers</span>
            <p class="mt-2 font-mono text-2xl sm:text-3xl font-bold text-white">{{ totalBackers() }}</p>
          </div>
          <div class="p-4 sm:p-6 rounded-sm border border-neutral-900 bg-neutral-950/60">
            <span class="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500">Campaigns</span>
            <p class="mt-2 font-mono text-2xl sm:text-3xl font-bold text-white">{{ funding().length }}</p>
          </div>
          <div class="p-4 sm:p-6 rounded-sm border border-neutral-900 bg-neutral-950/60">
            <span class="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500">Active Channels</span>
            <p class="mt-2 font-mono text-2xl sm:text-3xl font-bold text-white">{{ activeChannels().length }}</p>
          </div>
        </section>

        <!-- Funding Campaigns -->
        <section class="mt-20 sm:mt-28" aria-labelledby="funding-heading">
          <div class="flex items-center justify-between pb-6 border-b border-neutral-900">
            <h2 id="funding-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
              FUNDING CAMPAIGNS
            </h2>
            <span class="font-mono text-[11px] text-neutral-600">{{ funding().length }} projects</span>
          </div>

          <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            @for (campaign of funding(); track campaign.id) {
              <article class="rounded-sm border border-neutral-900 bg-neutral-950/60 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white">{{ campaign.title }}</h3>
                      <p class="mt-2 text-sm text-neutral-400 leading-relaxed">{{ campaign.text }}</p>
                    </div>
                    <span class="font-mono text-xs text-[#d4ff00] whitespace-nowrap">{{ pct(campaign) }}%</span>
                  </div>

                  <!-- Progress Bar -->
                  <div class="mt-6">
                    <div class="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
                      <span>\${{ campaign.raised }} raised</span>
                      <span>Goal: \${{ campaign.goal }}</span>
                    </div>
                    <div class="h-2 overflow-hidden rounded-full bg-neutral-900">
                      <div
                        class="h-full bg-[#d4ff00] transition-all duration-500"
                        [style.width.%]="pct(campaign)"
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-900">
                  <div class="flex items-center gap-2 font-mono text-xs text-neutral-500">
                    <span>{{ campaign.backers }} backers</span>
                    <span>·</span>
                    <span>{{ campaign.updates }}</span>
                  </div>
                  <button
                    type="button"
                    (click)="selectCampaign(campaign.id)"
                    class="cursor-pointer font-mono text-xs uppercase px-4 py-2 rounded-sm border transition-colors"
                    [class]="
                      selectedCampaign() === campaign.id
                        ? 'bg-[#d4ff00] text-black border-[#d4ff00] font-bold'
                        : 'border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500'
                    "
                  >
                    {{ selectedCampaign() === campaign.id ? 'Selected ✓' : 'Support this →' }}
                  </button>
                </div>
              </article>
            }
          </div>
        </section>

        <!-- Donation Channels -->
        <section class="mt-20 sm:mt-28" aria-labelledby="channels-heading">
          <div class="flex items-center justify-between pb-6 border-b border-neutral-900">
            <h2 id="channels-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
              DONATION CHANNELS
            </h2>
            <span class="font-mono text-[11px] text-neutral-600">Direct support</span>
          </div>

          @if (activeChannels().length === 0) {
            <p class="mt-12 text-neutral-400 text-sm font-mono">No active donation channels configured yet.</p>
          }

          <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            @for (channel of activeChannels(); track channel.id) {
              <article class="rounded-sm border border-neutral-900 bg-neutral-950/60 p-6 flex flex-col justify-between gap-4">
                <div>
                  <h3 class="font-bold text-white text-lg">{{ channel.label }}</h3>
                  <p class="mt-1 text-sm text-neutral-400">{{ channel.description }}</p>
                </div>

                @if (channel.kind === 'link' && channel.url) {
                  <a
                    [href]="channel.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    (click)="recordTip(channel)"
                    class="block text-center font-mono text-xs uppercase px-4 py-2.5 rounded-sm bg-white text-black hover:bg-[#d4ff00] font-bold tracking-wider transition-colors"
                  >
                    Tip via {{ channel.label }} ↗
                  </a>
                } @else if (channel.kind === 'mpesa') {
                  <div class="rounded-sm border border-neutral-800 bg-black/40 p-3 font-mono text-xs space-y-1.5">
                    @if (config().mpesa.paybill) {
                      <p class="flex justify-between">
                        <span class="text-neutral-500">Paybill</span>
                        <strong class="text-white">{{ config().mpesa.paybill }}</strong>
                      </p>
                    }
                    @if (config().mpesa.till) {
                      <p class="flex justify-between">
                        <span class="text-neutral-500">Till</span>
                        <strong class="text-white">{{ config().mpesa.till }}</strong>
                      </p>
                    }
                    @if (config().mpesa.account) {
                      <p class="flex justify-between">
                        <span class="text-neutral-500">Account</span>
                        <strong class="text-white">{{ config().mpesa.account }}</strong>
                      </p>
                    }
                  </div>
                }
              </article>
            }
          </div>
        </section>

        <!-- Custom Donation Amount -->
        <section class="mt-20 sm:mt-28" aria-labelledby="custom-amount-heading">
          <div class="flex items-center justify-between pb-6 border-b border-neutral-900">
            <h2 id="custom-amount-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500">
              CUSTOM AMOUNT
            </h2>
            <span class="font-mono text-[11px] text-neutral-600">Any amount helps</span>
          </div>

          <div class="mt-12 rounded-sm border border-neutral-900 bg-neutral-950/60 p-6 sm:p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-bold text-white">Choose an amount</h3>
                <p class="mt-2 text-sm text-neutral-400">
                  Select a preset or enter a custom amount. Your donation goes directly to the selected campaign.
                </p>

                <div class="mt-6 flex flex-wrap gap-2">
                  @for (preset of presets(); track preset) {
                    <button
                      type="button"
                      (click)="customAmount.set(preset)"
                      class="cursor-pointer font-mono text-sm px-4 py-2.5 rounded-sm border transition-colors"
                      [class]="
                        customAmount() === preset
                          ? 'bg-[#d4ff00] text-black border-[#d4ff00] font-bold'
                          : 'border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500'
                      "
                    >
                      \${{ preset }}
                    </button>
                  }
                </div>

                <label class="block mt-6 space-y-2">
                  <span class="font-mono text-xs uppercase text-neutral-400">Custom amount (USD)</span>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-mono">$</span>
                    <input
                      type="number"
                      min="1"
                      [(ngModel)]="customAmount"
                      class="w-full pl-7 pr-3 py-2.5 rounded-sm bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-[#d4ff00] text-sm font-mono"
                      placeholder="25"
                    />
                  </div>
                </label>
              </div>

              <div class="flex flex-col justify-between rounded-sm border border-neutral-800 bg-black/30 p-6">
                <div>
                  <span class="font-mono text-xs uppercase tracking-wider text-neutral-500">Summary</span>
                  <div class="mt-4 space-y-3 font-mono text-sm">
                    <div class="flex justify-between">
                      <span class="text-neutral-400">Campaign</span>
                      <span class="text-white">{{ selectedCampaignTitle() }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-neutral-400">Amount</span>
                      <span class="text-[#d4ff00] font-bold">\${{ customAmount() || 0 }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-neutral-400">Channel</span>
                      <span class="text-white">Direct</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  (click)="submitDonation()"
                  [disabled]="!customAmount() || customAmount() < 1 || busy()"
                  class="cursor-pointer mt-6 w-full font-mono text-xs uppercase px-4 py-3 rounded-sm bg-[#d4ff00] hover:bg-[#c2eb00] text-black font-bold tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {{ busy() ? 'Processing…' : 'Continue to payment →' }}
                </button>
              </div>
            </div>

            @if (donationMessage()) {
              <p
                class="mt-6 p-3 rounded-sm font-mono text-xs border"
                [class]="
                  donationError()
                    ? 'border-red-900/50 bg-red-950/20 text-red-400'
                    : 'border-[#d4ff00]/30 bg-[#d4ff00]/5 text-[#d4ff00]'
                "
                role="status"
              >
                {{ donationMessage() }}
              </p>
            }
          </div>
        </section>

        <!-- Terms -->
        <section class="mt-16" aria-labelledby="terms-heading">
          <h2 id="terms-heading" class="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4">
            HOW IT WORKS
          </h2>
          <ul class="space-y-2 font-mono text-xs text-neutral-500">
            @for (term of terms(); track $index) {
              <li class="flex items-start gap-2">
                <span class="text-[#d4ff00] mt-0.5">→</span>
                <span>{{ term }}</span>
              </li>
            }
          </ul>
        </section>
      </div>

      <app-say-hello theme="dark" />
    </main>
  `,
})
export class DonatePageComponent {
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  private readonly http = inject(HttpClient);

  readonly config = this.content.donations;
  readonly funding = this.content.funding;
  readonly presets = this.content.presets;
  readonly terms = this.content.terms;

  readonly selectedCampaign = signal<string>(this.funding()[0]?.id ?? '');
  readonly customAmount = signal<number>(25);
  readonly busy = signal(false);
  readonly donationMessage = signal('');
  readonly donationError = signal(false);

  readonly totalRaised = computed(() => this.funding().reduce((s, f) => s + f.raised, 0));
  readonly totalBackers = computed(() => this.funding().reduce((s, f) => s + f.backers, 0));

  readonly selectedCampaignTitle = computed(() => {
    const c = this.funding().find((f) => f.id === this.selectedCampaign());
    return c?.title ?? '—';
  });

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

  constructor() {
    this.seo.updateMetadata({
      title: 'Support & Funding | David Karanja',
      description:
        'Support open-source projects, 3D tools, and business systems. Fund campaigns or send a direct tip via M-Pesa, card, or GitHub Sponsors.',
      canonicalUrl: 'https://karanjadavid.com/donate',
      keywords:
        'David Karanja, Donate, Funding, Support Open Source, M-Pesa, Buy Me a Coffee, GitHub Sponsors',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Support David Karanja',
        url: 'https://karanjadavid.com/donate',
        description: 'Fund open-source projects and business systems by David Karanja.',
      },
    });
  }

  pct(f: FundingCampaign): number {
    return f.goal ? Math.min(100, Math.round((f.raised / f.goal) * 100)) : 0;
  }

  selectCampaign(id: string) {
    this.selectedCampaign.set(id);
    this.donationMessage.set('');
  }

  recordTip(channel: DonationChannel) {
    if (!environment.apiBase) return;
    this.http
      .post(
        `${environment.apiBase}/donations/record`,
        { channel: channel.id, amount_cents: 0, currency: 'USD', status: 'clicked' },
        { withCredentials: true },
      )
      .subscribe({ error: () => {} });
  }

  submitDonation() {
    const amount = this.customAmount();
    if (!amount || amount < 1) return;

    this.busy.set(true);
    this.donationMessage.set('');
    this.donationError.set(false);

    if (!environment.apiBase) {
      this.busy.set(false);
      this.donationMessage.set(
        `Thank you! To complete your $${amount} pledge to "${this.selectedCampaignTitle()}", ` +
        `please use one of the donation channels above or email ${this.content.site().email}.`,
      );
      return;
    }

    this.http
      .post(
        `${environment.apiBase}/donations/record`,
        {
          campaign_id: this.selectedCampaign(),
          amount_cents: Math.round(amount * 100),
          currency: 'USD',
          status: 'pending',
        },
        { withCredentials: true },
      )
      .subscribe({
        next: () => {
          this.busy.set(false);
          this.donationMessage.set(
            `Thank you for pledging $${amount} to "${this.selectedCampaignTitle()}"! Check your email for next steps.`,
          );
        },
        error: () => {
          this.busy.set(false);
          this.donationError.set(true);
          this.donationMessage.set('Could not process donation. Please try a donation channel above.');
        },
      });
  }
}
