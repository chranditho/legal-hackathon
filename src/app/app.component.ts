import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { CookieBannerComponent } from './shared/cookie-banner/cookie-banner.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet, CookieBannerComponent, NgIf],
  template: `
    <app-cookie-banner (consentGiven)="onConsent()"></app-cookie-banner>

    <div [class.pointer-events-none]="!cookiesAccepted" [class.opacity-20]="!cookiesAccepted" class="transition-opacity duration-300">
      <app-nav>
        <router-outlet *ngIf="cookiesAccepted" />
      </app-nav>
    </div>
  `
})
export class AppComponent {
  public cookiesAccepted = false;

  onConsent() {
    this.cookiesAccepted = true;
  }
}
