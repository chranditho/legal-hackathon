import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../ui/product-card/product-card.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HomePageComponent {}
