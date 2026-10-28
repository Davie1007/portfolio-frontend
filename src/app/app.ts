import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentService } from './services/content.service';
import { ABOUT, CAPABILITIES, IDEAS } from './content';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterLink],
  templateUrl: './app.html',
})
export class App implements AfterViewInit, OnDestroy {
  private readonly content = inject(ContentService);

  readonly site = this.content.site();
  readonly work = this.content.work();

  readonly about = ABOUT;
  readonly capabilities = CAPABILITIES;
  readonly ideas = IDEAS;

  readonly year = new Date().getFullYear();

  private io?: IntersectionObserver;

  ngAfterViewInit() {
    const root = document.documentElement;

    // No IntersectionObserver → reveal everything, skip the animation opt-in.
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
      return;
    }

    // Enable the hidden-then-reveal behaviour only once JS is confirmed to run.
    root.classList.add('js-ready');

    // If the user prefers reduced motion, skip straight to the visible state.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
      return;
    }

    this.io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            this.io?.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.05 },
    );

    document.querySelectorAll('.reveal').forEach((el) => this.io!.observe(el));
  }

  ngOnDestroy() {
    this.io?.disconnect();
  }

  stackList(stack: string): string[] {
    return stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
}
