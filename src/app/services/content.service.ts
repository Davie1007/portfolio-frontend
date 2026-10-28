import { Injectable, computed, effect, signal } from '@angular/core';
import {
  ABOUT,
  DEFAULT_FUNDING_ID,
  DONATIONS,
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
} from '../content';

export type SiteConfig = typeof SITE;
export type FundingCampaign = (typeof FUNDING)[number];
export type Testimonial = (typeof TESTIMONIALS)[number];
export type WorkItem = (typeof WORK)[number];
export type ServiceItem = (typeof SERVICES)[number];
export type Tier = (typeof TIERS)[number];
export type DonationConfig = typeof DONATIONS; // ← NEW

export interface SiteSnapshot {
  site: SiteConfig;
  funding: FundingCampaign[];
  testimonials: Testimonial[];
  work: WorkItem[];
  services: ServiceItem[];
  tiers: Tier[];
  presets: number[];
  terms: string[];
  donations: DonationConfig; // ← NEW
  updatedAt: string;
}

const STORAGE_KEY = 'dk-site-content-v1';

function seed(): SiteSnapshot {
  return {
    site: { ...SITE },
    funding: FUNDING.map((f) => ({ ...f })),
    testimonials: TESTIMONIALS.map((t) => ({ ...t })),
    work: WORK.map((w) => ({ ...w })),
    services: SERVICES.map((s) => ({ ...s })),
    tiers: TIERS.map((t) => ({ ...t })),
    presets: [...PRESETS],
    terms: [...TERMS],
    donations: structuredClone(DONATIONS), // ← NEW
    updatedAt: new Date().toISOString(),
  };
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly _state = signal<SiteSnapshot>(this.load());
  readonly state = this._state.asReadonly();

  readonly site = computed(() => this._state().site);
  readonly funding = computed(() => this._state().funding);
  readonly testimonials = computed(() => this._state().testimonials);
  readonly work = computed(() => this._state().work);
  readonly services = computed(() => this._state().services);
  readonly tiers = computed(() => this._state().tiers);
  readonly presets = computed(() => this._state().presets);
  readonly terms = computed(() => this._state().terms);
  readonly donations = computed(() => this._state().donations); // ← NEW
  readonly defaultFundingId = computed(() => this._state().funding[0]?.id ?? DEFAULT_FUNDING_ID);

  readonly nav = NAV;
  readonly promises = PROMISES;
  readonly ideas = IDEAS;
  readonly steps = STEPS;
  readonly trust = TRUST_STRIP;
  readonly about = ABOUT;

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state()));
      } catch {
        /* ignore */
      }
    });
  }

  private load(): SiteSnapshot {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SiteSnapshot>;
        // Backfill donations if the stored snapshot predates this field.
        return {
          ...seed(),
          ...parsed,
          donations: parsed.donations ?? structuredClone(DONATIONS),
        } as SiteSnapshot;
      }
    } catch {
      /* fall through */
    }
    return seed();
  }

  patchSite(patch: Partial<SiteConfig>) {
    this._state.update((s) => ({
      ...s,
      site: { ...s.site, ...patch },
      updatedAt: new Date().toISOString(),
    }));
  }

  patchFunding(id: string, patch: Partial<FundingCampaign>) {
    this._state.update((s) => ({
      ...s,
      funding: s.funding.map((f) => (f.id === id ? { ...f, ...patch } : f)),
      updatedAt: new Date().toISOString(),
    }));
  }

  patchTestimonial(idx: number, patch: Partial<Testimonial>) {
    this._state.update((s) => ({
      ...s,
      testimonials: s.testimonials.map((t, i) => (i === idx ? { ...t, ...patch } : t)),
      updatedAt: new Date().toISOString(),
    }));
  }

  patchWork(idx: number, patch: Partial<WorkItem>) {
    this._state.update((s) => ({
      ...s,
      work: s.work.map((w, i) => (i === idx ? { ...w, ...patch } : w)),
      updatedAt: new Date().toISOString(),
    }));
  }

  patchService(idx: number, patch: Partial<ServiceItem>) {
    this._state.update((s) => ({
      ...s,
      services: s.services.map((x, i) => (i === idx ? { ...x, ...patch } : x)),
      updatedAt: new Date().toISOString(),
    }));
  }

  patchTier(idx: number, patch: Partial<Tier>) {
    this._state.update((s) => ({
      ...s,
      tiers: s.tiers.map((t, i) => (i === idx ? { ...t, ...patch } : t)),
      updatedAt: new Date().toISOString(),
    }));
  }

  setPresets(presets: number[]) {
    this._state.update((s) => ({ ...s, presets, updatedAt: new Date().toISOString() }));
  }

  setTerms(terms: string[]) {
    this._state.update((s) => ({ ...s, terms, updatedAt: new Date().toISOString() }));
  }

  // ---- NEW: donations ----
  patchDonations(patch: Partial<DonationConfig>) {
    this._state.update((s) => ({
      ...s,
      donations: { ...s.donations, ...patch },
      updatedAt: new Date().toISOString(),
    }));
  }

  patchDonationChannel(id: string, patch: Partial<DonationConfig['channels'][number]>) {
    this._state.update((s) => ({
      ...s,
      donations: {
        ...s.donations,
        channels: s.donations.channels.map((c) => (c.id === id ? { ...c, ...patch } : c)),
      },
      updatedAt: new Date().toISOString(),
    }));
  }

  patchMpesa(patch: Partial<DonationConfig['mpesa']>) {
    this._state.update((s) => ({
      ...s,
      donations: { ...s.donations, mpesa: { ...s.donations.mpesa, ...patch } },
      updatedAt: new Date().toISOString(),
    }));
  }

  reset() {
    this._state.set(seed());
  }

  exportJson(): string {
    return JSON.stringify(this._state(), null, 2);
  }

  importJson(json: string) {
    const parsed = JSON.parse(json) as SiteSnapshot;
    this._state.set({ ...parsed, updatedAt: new Date().toISOString() });
  }
}
