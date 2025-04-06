import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="showBanner"
      class="fixed inset-0 backdrop-blur-xs bg-black/10 z-80 flex items-center justify-center">
      <div class="bg-white text-black p-6 rounded shadow max-w-lg text-center">
        <p class="mb-4">
          We use cookies to improve your experience. By using this site, you
          accept our use of cookies.
        </p>
        <button
          class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
          (click)="acceptCookies()">
          Accept
        </button>
      </div>
    </div>
  `,
})
export class CookieBannerComponent implements OnInit {
  public showBanner = false;
  private readonly storageKey = 'cookie-consent';

  @Output() consentGiven = new EventEmitter<void>();

  ngOnInit(): void {
    this.showBanner = localStorage.getItem(this.storageKey) !== 'true';
    if (!this.showBanner) {
      this.consentGiven.emit(); // already accepted
    }
  }

  public acceptCookies(): void {
    localStorage.setItem(this.storageKey, 'true');
    this.showBanner = false;
    this.consentGiven.emit();
  }
}
