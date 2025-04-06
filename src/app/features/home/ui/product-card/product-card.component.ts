import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

export interface ProductCard {
  title: string;
  text: string;
  imageUrl: string;
  link: string;
}

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, RouterLink, NgOptimizedImage],
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
