import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="showBanner"
      class="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center">
      <div
        class="bg-white text-black p-6 rounded shadow max-w-lg text-center space-y-4">
        <p class="mb-2">
          We use cookies to enhance your experience. By continuing to use our
          site, you accept our use of cookies.
        </p>
        <div class="text-sm">
          <a
            routerLink="/impressum"
            (click)="goToImpressum()"
            class="underline cursor-pointer text-blue-600 hover:text-blue-800 mr-2">
            Impressum
          </a>
          <a
            routerLink="/datenschutzerklaerung"
            (click)="goToDatenschutz()"
            class="underline cursor-pointer text-blue-600 hover:text-blue-800">
            Datenschutzerklärung
          </a>
        </div>
        <div class="flex justify-center gap-4 mt-4">
          <button
            class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
            (click)="acceptCookies()">
            Accept
          </button>
          <button
            class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
            (click)="declineCookies()">
            Decline
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CookieBannerComponent implements OnInit {
  public showBanner = false;
  private readonly storageKey = 'cookie-consent';

  @Output() consentGiven = new EventEmitter<void>();

  ngOnInit(): void {
    const excludedRoutes = ['/impressum', '/datenschutzerklaerung'];
    const consentGiven = localStorage.getItem(this.storageKey) === 'true';

    this.showBanner =
      !consentGiven && !excludedRoutes.includes(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        const consentGiven = localStorage.getItem(this.storageKey) === 'true';

        // Cookie-Banner nur zeigen, wenn nicht akzeptiert und nicht auf einer Ausnahmeseite
        this.showBanner = !consentGiven && !excludedRoutes.includes(currentUrl);
      });

    this.showBanner = localStorage.getItem(this.storageKey) !== 'true';
    if (!this.showBanner) {
      this.consentGiven.emit(); // already accepted
    }
  }

  constructor(private router: Router) {}

  public acceptCookies(): void {
    localStorage.setItem(this.storageKey, 'true');
    this.showBanner = false;
    this.consentGiven.emit();
  }

  public declineCookies(): void {
    localStorage.setItem(this.storageKey, 'false');
    this.showBanner = false;
    this.consentGiven.emit();
  }

  public goToImpressum(): void {
    window.open('/impressum', '_blank');
  }

  public goToDatenschutz(): void {
    window.open('/datenschutzerklaerung', '_blank');
  }
}
