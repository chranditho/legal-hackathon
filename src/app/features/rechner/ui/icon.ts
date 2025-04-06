// profile-pic.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  template: `<img [src]="imageUrl" class="profile-pic" />`,
  styles: [
    `
      .profile-pic {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #ccc;
      }
    `,
  ],
})
export class ProfilePicComponent implements OnInit {
  ngOnInit(): void {
    if (this.personenArt == 'Ehegatte') {
      this.imageUrl = 'diamond-ring.png';
    }

    if (this.personenArt == 'Lebensgefährte') {
      this.imageUrl = 'heart.png';
    }

    if ((this.personenArt = 'Mutter')) {
      this.imageUrl = 'mother.png';
    }
  }
  imageUrl: string = 'diamond-ring.png';
  @Input() personenArt: string = '';
}
