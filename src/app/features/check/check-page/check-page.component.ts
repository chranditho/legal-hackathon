import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisclaimerDialogComponent } from './disclaimer-dialog.component';
import {NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-check-page',
  standalone: true,
  templateUrl: './check-page.component.html',
  imports: [
    NgOptimizedImage,
    MatButton
  ]
})
export class CheckPageComponent {
  constructor(private dialog: MatDialog) {}

  openDisclaimerDialog() {
    const dialogRef = this.dialog.open(DisclaimerDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accepted') {
        console.log('User accepted disclaimer – proceed.');
        // do something next, like navigate or enable upload
      }
    });
  }
}
