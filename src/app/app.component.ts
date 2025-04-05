import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { CookieBannerComponent } from './shared/cookie-banner/cookie-banner.component'; // add this

@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterOutlet, CookieBannerComponent], // add CookieBannerComponent
  template: `
    <app-cookie-banner></app-cookie-banner>
    <app-nav>
      <router-outlet />
    </app-nav>
  `,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class AppComponent {}
