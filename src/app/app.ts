import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
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
import { environment } from '../environments/environment';
import { CountUp } from './motion';
import { BOOKING_URL, LOCAL, PROOFS, WHATSAPP, WHATSAPP_TEXT } from './reach';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterLink, DonateComponent, CountUp],
  templateUrl: './app.html',
})
export class App implements AfterViewInit, OnDestroy {
  private readonly content = inject(ContentService);
  private readonly http = inject(HttpClient);

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

  readonly local = LOCAL;
  readonly proofs = PROOFS;
  readonly booking = BOOKING_URL;
  readonly waLink = WHATSAPP
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_TEXT)}`
    : '';
  /** true when a backend is configured; otherwise pledges and enquiries go out by email */
  readonly live = !!environment.apiBase;

  // ---- Header, scroll progress, scrollspy, mobile menu ----
  readonly scrolled = signal(false);
  readonly progress = signal(0);
  readonly active = signal('top');
  readonly menuOpen = signal(false);
  private ticking = false;
  private spy?: IntersectionObserver;

  @HostListener('window:scroll')
  onScroll() {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      this.scrolled.set(window.scrollY > 8);
      this.progress.set(max > 0 ? Math.min(100, (d.scrollTop / max) * 100) : 0);
      this.ticking = false;
    });
  }

  @HostListener('document:keydown.escape')
  closeMenu() {
    this.menuOpen.set(false);
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver !== 'undefined') {
      this.spy = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && this.active.set(e.target.id)),
        { rootMargin: '-40% 0px -55% 0px' },
      );
      document.querySelectorAll('main section[id]').forEach((s) => this.spy!.observe(s));
    }
  }

  ngOnDestroy() {
    this.spy?.disconnect();
  }

  // ---- Testimonials ----
  // ---- Hero figure: forecast error shrinks roughly with sqrt(n) ----
  readonly n = signal(24);
  readonly moe = computed(() => (1.96 * 20) / Math.sqrt(this.n()));
  readonly bandPath = computed(() => {
    const k = this.moe() * 1.1;
    const xs = [30, 90, 150, 210, 270, 330, 390, 450];
    const y = (x: number) => 210 - 0.29 * (x - 30);
    const h = (x: number) => k * (1 + Math.max(0, x - 270) / 120);
    const up = xs.map((x) => `${x},${(y(x) - h(x)).toFixed(1)}`);
    const lo = [...xs].reverse().map((x) => `${x},${(y(x) + h(x)).toFixed(1)}`);
    return 'M' + up.join(' L') + ' L' + lo.join(' L') + ' Z';
  });
  readonly dots = [-6, 5, -9, 3, 8, -4, 6, -7, 2].map((d, i) => ({
    x: 30 + i * 30,
    y: 210 - 0.29 * i * 30 + d,
  }));
  setN(e: Event) {
    this.n.set(+(e.target as HTMLInputElement).value);
  }

  // ---- Back a project ----
  readonly projectId = signal(DEFAULT_FUNDING_ID);
  readonly amount = signal(100);
  readonly pledgeName = signal('');
  readonly pledgeEmail = signal('');
  readonly pledgeBusy = signal(false);
  readonly pledgeCode = signal('');
  readonly pledgeStatus = signal('');
  readonly pledgeViaEmail = signal(false);
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
    this.pledgeBusy.set(true);
    this.pledgeStatus.set('');

    try {
      if (environment.apiBase) {
        const res = await firstValueFrom(
          this.http.post<{ code: string }>(
            `${environment.apiBase}/pledges`,
            { project_id: this.projectId(), name, email, amount, discount_pct: t?.off ?? 0 },
            { withCredentials: true },
          ),
        );
        this.pledgeCode.set(res.code);
        try {
          localStorage.setItem('dk-pledge', res.code);
        } catch {
          /* ignore */
        }
      } else {
        // No backend: open an email request. No code is issued and nothing is charged until I confirm.
        const body = [
          `project: ${this.project().title}`,
          `amount_usd: ${amount}`,
          `discount_if_confirmed: ${t ? t.off + '%' : 'none'}`,
          `name: ${name}`,
          `email: ${email}`,
        ].join('\n');
        this.pledgeViaEmail.set(true);
        location.href = `mailto:${this.site.email}?subject=${encodeURIComponent(
          `Pledge request: ${this.project().title}`,
        )}&body=${encodeURIComponent(body)}`;
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
    this.pledgeViaEmail.set(false);
    this.pledgeName.set('');
    this.pledgeEmail.set('');
    this.pledgeStatus.set('');
    this.amount.set(100);
    this.projectId.set(this.content.defaultFundingId());
  }

  // ---- Contact ----
  readonly c = signal({
    name: '',
    email: '',
    need: '',
    budget: 'Not sure yet',
    timeline: 'Flexible',
  });
  readonly sent = signal(false);
  readonly sentViaEmail = signal(false);
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
      if (environment.apiBase) {
        await firstValueFrom(
          this.http.post(`${environment.apiBase}/contact`, this.c(), { withCredentials: true }),
        );
      } else {
        this.sentViaEmail.set(true);
        const body = Object.entries(this.c())
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n');
        location.href = `mailto:${this.site.email}?subject=${encodeURIComponent(
          'New project enquiry',
        )}&body=${encodeURIComponent(body)}`;
      }
      this.sent.set(true);
      requestAnimationFrame(() => this.contactSuccess?.nativeElement.focus());
    } catch {
      this.contactStatus.set('Sending failed. Please try again or email me directly.');
    }

    this.contactBusy.set(false);
  }

  // add near the other signals
  readonly tokensOpen = signal(false);
  readonly accent = signal('#6d8dff');
  readonly radius = signal(6);

  setAccent(hex: string) {
    this.accent.set(hex);
    document.documentElement.style.setProperty('--accent', hex);
  }
  setRadius(px: number) {
    this.radius.set(px);
    document.documentElement.style.setProperty('--radius-ui', px + 'px');
  }

  // reset tokens when the panel is closed
  constructor() {
    // existing constructor body...
    effect(() => {
      if (!this.tokensOpen()) {
        document.documentElement.style.removeProperty('--accent');
        document.documentElement.style.removeProperty('--radius-ui');
      }
    });
  }
}
