import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from './services/content.service';
import { NavHeaderComponent } from './components/nav-header.component';
import { BackgroundGridComponent } from './components/background-grid.component';
import { SayHelloComponent } from './components/say-hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, NavHeaderComponent, BackgroundGridComponent, SayHelloComponent],
  templateUrl: './app.html',
})
export class App {
  private readonly content = inject(ContentService);

  readonly site = this.content.site;
  readonly caseStudies = this.content.caseStudies;

  readonly year = new Date().getFullYear();
  readonly yearShort = "'" + String(this.year).slice(-2);
}
