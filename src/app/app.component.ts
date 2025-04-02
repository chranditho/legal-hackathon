import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterOutlet],
  template: `
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
