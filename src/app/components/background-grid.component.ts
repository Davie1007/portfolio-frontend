import { Component, input } from '@angular/core';

@Component({
  selector: 'app-background-grid',
  standalone: true,
  template: `
    <div
      class="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      <div class="mx-auto h-full w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div class="grid h-full w-full grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          <div [class]="lineClass()"></div>
          <div [class]="lineClass()"></div>
          <div [class]="lineClass()"></div>
          <div [class]="lineClass()"></div>
          <div [class]="lineClass() + ' hidden sm:block'"></div>
          <div [class]="lineClass() + ' hidden sm:block'"></div>
          <div [class]="lineClass() + ' hidden md:block'"></div>
          <div [class]="lineClass() + ' hidden md:block'"></div>
          <div [class]="lineClass() + ' hidden lg:block'"></div>
          <div [class]="lineClass() + ' hidden lg:block'"></div>
          <div [class]="lineClass() + ' hidden xl:block'"></div>
          <div [class]="lineClass() + ' hidden xl:block'"></div>
        </div>
      </div>
    </div>
  `,
})
export class BackgroundGridComponent {
  theme = input<'dark' | 'light'>('dark');

  lineClass() {
    return this.theme() === 'dark'
      ? 'relative h-full border-x border-solid border-white/[0.05]'
      : 'relative h-full border-x border-solid border-black/[0.06]';
  }
}
