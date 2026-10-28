import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/** Counts up to a number when visible. Usage: <span [countUp]="1200">0</span> */
@Directive({ selector: '[countUp]', standalone: true })
export class CountUp implements OnInit, OnDestroy {
  @Input('countUp') target = 0;
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private io?: IntersectionObserver;
  private raf = 0;

  ngOnInit(): void {
    const show = (n: number): void => {
      this.el.textContent = Math.round(n).toLocaleString('en-US');
    };

    // Guard *both* globals before touching them — matchMedia is missing in SSR.
    const noObserver = typeof IntersectionObserver === 'undefined';
    const reduced =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || noObserver) {
      show(this.target);
      return;
    }

    show(0);

    this.io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      this.io?.disconnect();
      this.io = undefined;

      const t0 = performance.now();
      const dur = 1200;

      const tick = (t: number): void => {
        const p = Math.min((t - t0) / dur, 1);
        show(this.target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) this.raf = requestAnimationFrame(tick);
      };

      this.raf = requestAnimationFrame(tick);
    });

    this.io.observe(this.el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.io = undefined;
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }
}
