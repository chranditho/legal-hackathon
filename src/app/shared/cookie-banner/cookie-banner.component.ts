import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="showBanner" class="fixed bottom-0 w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg z-50">
      <span>
        We use cookies to enhance your experience. By using this site, you agree to our cookie policy.
      </span>
      <button
        class="ml-4 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
        (click)="acceptCookies()"
      >
        Accept
      </button>
    </div>
  `
})
export class CookieBannerComponent implements OnInit {
  public showBanner = false;
  private readonly storageKey = 'cookie-consent';

  ngOnInit(): void {
    this.showBanner = localStorage.getItem(this.storageKey) !== 'true';
  }

  public acceptCookies(): void {
    localStorage.setItem(this.storageKey, 'true');
    this.showBanner = false;
  }
}
