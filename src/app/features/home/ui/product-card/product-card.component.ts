import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export interface ProductCard {
  title: string;
  text: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product-card.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ProductCardComponent {
  card = input.required<ProductCard>();
}
