import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ABOUT,
  capabilities,
  DEFAULT_FUNDING_ID,
  IDEAS,
  NAV,
  PROMISES,
  STEPS,
  TRUST_STRIP,
} from './content';
import { ContentService } from './services/content.service';
import { DonateComponent } from './donate/donate.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterLink, DonateComponent],
  templateUrl: './app.html',
})
export class App {
  private readonly content = inject(ContentService);

  readonly site = this.content.site();
  readonly services = this.content.services();
  readonly work = this.content.work();
  readonly testimonials = this.content.testimonials();
  readonly tiers = this.content.tiers();
  readonly presets = this.content.presets();
  readonly funding = this.content.funding();
  readonly terms = this.content.terms();

  readonly nav = NAV;
  readonly trust = TRUST_STRIP;
  readonly promises = PROMISES;
  readonly steps = STEPS;
  readonly ideas = IDEAS;
  readonly about = ABOUT;
  readonly capabilities = capabilities;
  readonly basedIn = this.about.facts.find((f) => f.label === 'Based in')?.value ?? '';
  readonly year = new Date().getFullYear();

  readonly scrolled = signal(false);
  private ticking = false;
  @HostListener('window:scroll')
  onScroll() {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.scrolled.set(window.scrollY > 8);
      this.ticking = false;
    });
  }

  readonly quoteIdx = signal(0);
  setQuote(i: number) {
    this.quoteIdx.set(i);
  }

  readonly projectId = signal(DEFAULT_FUNDING_ID);
  readonly amount = signal(100);
  readonly pledgeName = signal('');
  readonly pledgeEmail = signal('');
  readonly pledgeBusy = signal(false);
  readonly pledgeCode = signal('');
  readonly pledgeStatus = signal('');
  @ViewChild('pledgeSuccess') pledgeSuccess?: ElementRef<HTMLElement>;

  readonly tier = computed(
    () => [...this.tiers].reverse().find((t) => this.amount() >= t.min) ?? null,
  );
  readonly project = computed(
    () => this.funding.find((f) => f.id === this.projectId()) ?? this.funding[0],
  );

  readonly totalRaised = computed(() => this.funding.reduce((s, f) => s + f.raised, 0));
  readonly totalGoal = computed(() => this.funding.reduce((s, f) => s + f.goal, 0));
  readonly totalBackers = computed(() => this.funding.reduce((s, f) => s + f.backers, 0));
  readonly hasFundingData = computed(() => this.totalRaised() > 0 || this.totalBackers() > 0);

  pct(f: { goal: number; raised: number }) {
    return f.goal ? Math.min(100, Math.round((f.raised / f.goal) * 100)) : 0;
  }
  isFunded(f: { goal: number; raised: number }) {
    return f.raised >= f.goal;
  }
  setAmount(e: Event) {
    this.amount.set(Math.max(1, Math.floor(+(e.target as HTMLInputElement).value || 0)));
  }

  async pledge(form?: HTMLFormElement) {
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const amount = this.amount();
    const name = this.pledgeName().trim();
    const email = this.pledgeEmail().trim();
    if (amount < this.tiers[0].min || !name || !email) {
      this.pledgeStatus.set('Please enter a valid amount, name and email.');
      return;
    }
    const t = this.tier();
    const code = 'DK-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    this.pledgeBusy.set(true);
    this.pledgeStatus.set('');
    this.pledgeCode.set(code);
    try {
      await this.send(`Project pledge: ${this.project().title}`, {
        name,
        email,
        project: this.project().title,
        amount_usd: String(amount),
        discount: t ? `${t.off}%` : 'none',
        code,
      });
      try {
        localStorage.setItem('dk-pledge', code);
      } catch {
        /* ignore */
      }
      requestAnimationFrame(() => this.pledgeSuccess?.nativeElement.focus());
    } catch {
      this.pledgeCode.set('');
      this.pledgeStatus.set('Sending failed. Please try again or email me directly.');
    }
    this.pledgeBusy.set(false);
  }

  resetPledge() {
    this.pledgeCode.set('');
    this.pledgeName.set('');
    this.pledgeEmail.set('');
    this.pledgeStatus.set('');
    this.amount.set(100);
    this.projectId.set(this.content.defaultFundingId());
  }

  readonly c = signal({
    name: '',
    email: '',
    need: '',
    budget: 'Not sure yet',
    timeline: 'Flexible',
  });
  readonly sent = signal(false);
  readonly contactStatus = signal('');
  readonly contactBusy = signal(false);
  @ViewChild('contactSuccess') contactSuccess?: ElementRef<HTMLElement>;

  upd(key: 'name' | 'email' | 'need' | 'budget' | 'timeline', v: string) {
    this.c.update((o) => ({ ...o, [key]: v }));
  }

  async contact(form?: HTMLFormElement) {
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.contactBusy.set(true);
    this.contactStatus.set('');
    try {
      await this.send('New project enquiry', this.c());
      this.sent.set(true);
      requestAnimationFrame(() => this.contactSuccess?.nativeElement.focus());
    } catch {
      this.contactStatus.set('Sending failed. Please try again or email me directly.');
    }
    this.contactBusy.set(false);
  }

  private async send(subject: string, data: Record<string, string>) {
    const apiUrl = this.site.apiUrl;
    if (apiUrl) {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 10_000);
      try {
        const r = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject, ...data }),
          signal: ctrl.signal,
        });
        if (!r.ok) throw new Error(`Request failed: ${r.status}`);
      } finally {
        clearTimeout(timer);
      }
      return;
    }
    const body = Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    location.href = `mailto:${this.site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
