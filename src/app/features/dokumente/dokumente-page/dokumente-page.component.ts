import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatAnchor} from '@angular/material/button';

@Component({
  selector: 'app-dokumente-page',
  imports: [
    MatIcon,
    MatAnchor,
  ],
  templateUrl: './dokumente-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class DokumentePageComponent {}
