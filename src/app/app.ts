import { Component, HostListener, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ABOUT,
  capabilities,
  FUNDING,
  IDEAS,
  NAV,
  PRESETS,
  PROMISES,
  SERVICES,
  SITE,
  STEPS,
  TERMS,
  TESTIMONIALS,
  TIERS,
  TRUST_STRIP,
  WORK,
} from './content';

@Component({ selector: 'app-root', imports: [FormsModule], templateUrl: './app.html' })
export class App {
  readonly site = SITE;
  readonly nav = NAV;
  readonly trust = TRUST_STRIP;
  readonly promises = PROMISES;
  readonly services = SERVICES;
  readonly steps = STEPS;
  readonly ideas = IDEAS;
  readonly work = WORK;
  readonly testimonials = TESTIMONIALS;
  readonly tiers = TIERS;
  readonly presets = PRESETS;
  readonly funding = FUNDING;
  readonly terms = TERMS;
  readonly year = new Date().getFullYear();
  readonly about = ABOUT;

  // Header scroll state
  readonly scrolled = signal(false);
  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 8);
    const header = document.querySelector('.site-header');
    header?.classList.toggle('scrolled', this.scrolled());
  }

  // Hero: Fourier partial sums (kept for potential reuse; not rendered in hero now).
  readonly W = 560;
  readonly H = 260;
  readonly terms_n = signal(5);
  private readonly xs = Array.from({ length: 281 }, (_, i) => (i / 280) * 2 * Math.PI);
  private py = (y: number) => this.H / 2 - (y * (this.H / 2 - 16)) / 1.3;
  private series = computed(() =>
    this.xs.map((x) => {
      let s = 0;
      for (let k = 1; k <= this.terms_n(); k++) s += Math.sin((2 * k - 1) * x) / (2 * k - 1);
      return (4 / Math.PI) * s;
    }),
  );
  readonly curve = computed(() =>
    this.series()
      .map(
        (y, i) =>
          `${i ? 'L' : 'M'}${((this.xs[i] / (2 * Math.PI)) * this.W).toFixed(1)},${this.py(y).toFixed(1)}`,
      )
      .join(''),
  );
  readonly target = `M0,${this.py(1)}H${this.W / 2}V${this.py(-1)}H${this.W}`;
  readonly error = computed(() => {
    const e = this.series().map((y, i) => y - (this.xs[i] < Math.PI ? 1 : -1));
    return Math.sqrt(e.reduce((a, b) => a + b * b, 0) / e.length) * 100;
  });
  setTerms(e: Event) {
    this.terms_n.set(+(e.target as HTMLInputElement).value);
  }

  // Testimonials
  readonly quoteIdx = signal(0);

  // Back a project
  readonly projectId = signal(FUNDING[0].id);
  readonly amount = signal(100);
  readonly pledgeName = signal('');
  readonly pledgeEmail = signal('');
  readonly tier = computed(() => [...TIERS].reverse().find((t) => this.amount() >= t.min) ?? null);
  readonly project = computed(() => FUNDING.find((f) => f.id === this.projectId())!);
  readonly pledgeCode = signal('');
  readonly status = signal('');
  readonly busy = signal(false);

  // Aggregate campaign stats for the section header.
  readonly totalRaised = computed(() => FUNDING.reduce((s, f) => s + f.raised, 0));
  readonly totalGoal = computed(() => FUNDING.reduce((s, f) => s + f.goal, 0));
  readonly totalBackers = computed(() => FUNDING.reduce((s, f) => s + f.backers, 0));

  pct(f: { goal: number; raised: number }) {
    return Math.min(100, Math.round((f.raised / f.goal) * 100));
  }
  isFunded(f: { goal: number; raised: number }) {
    return f.raised >= f.goal;
  }
  setAmount(e: Event) {
    this.amount.set(Math.max(1, Math.floor(+(e.target as HTMLInputElement).value || 0)));
  }

  async pledge() {
    const t = this.tier();
    this.busy.set(true);
    this.status.set('');
    const code = 'DK-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      await this.send(`Project pledge: ${this.project().title}`, {
        name: this.pledgeName(),
        email: this.pledgeEmail(),
        project: this.project().title,
        amount_usd: String(this.amount()),
        discount: t ? `${t.off}%` : 'none',
        code,
      });
      this.pledgeCode.set(code);
      try {
        localStorage.setItem('dk-pledge', code);
      } catch {
        /* storage unavailable */
      }
    } catch {
      this.status.set('Sending failed. Please try again or email me directly.');
    }
    this.busy.set(false);
  }

  resetPledge() {
    this.pledgeCode.set('');
    this.pledgeName.set('');
    this.pledgeEmail.set('');
    this.amount.set(100);
    this.projectId.set(FUNDING[0].id);
  }

  // Contact
  readonly c = signal({
    name: '',
    email: '',
    need: '',
    budget: 'Not sure yet',
    timeline: 'Flexible',
  });
  readonly sent = signal(false);
  upd(key: 'name' | 'email' | 'need' | 'budget' | 'timeline', v: string) {
    this.c.update((o) => ({ ...o, [key]: v }));
  }
  async contact() {
    try {
      await this.send('New project enquiry', this.c());
      this.sent.set(true);
    } catch {
      this.status.set('Sending failed. Please try again or email me directly.');
    }
  }

  private async send(subject: string, data: Record<string, string>) {
    if (SITE.apiUrl) {
      const r = await fetch(SITE.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, ...data }),
      });
      if (!r.ok) throw new Error('request failed');
      return;
    }
    const body = Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  protected readonly capabilities = capabilities;
}
