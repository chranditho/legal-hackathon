import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatAnchor, MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-dokumente-page',
  imports: [
    MatIcon,
    MatAnchor,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
  ],
  templateUrl: './dokumente-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class DokumentePageComponent {}
