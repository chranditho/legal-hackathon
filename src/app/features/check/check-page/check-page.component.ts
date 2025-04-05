import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-check-page',
  imports: [NgOptimizedImage],
  templateUrl: './check-page.component.html',
  styles: `
    :host {
      @apply block;
    }
  `,
})
export class CheckPageComponent {}
