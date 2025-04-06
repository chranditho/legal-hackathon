import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-disclaimer-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCheckbox,
    MatDialogActions,
    MatDialogTitle,
    FormsModule,
    MatButton,
  ],
  template: `
    <h2 mat-dialog-title>Einwilligungserklärung</h2>
    <mat-dialog-content>
      <p>
        Ich stimme hiermit ausdrücklich zu, dass die von mir bekanntgegebenen personenbezogenen Daten und Informationen zum Zweck der Erfassung des Testamentes verarbeitet und gespeichert werden dürfen.
        Ich kann diese Einwilligung jederzeit per E-Mail an info[at]fairerben.at widerrufen. Wir verarbeiten Ihre personenbezogenen Daten;  Name, Wohnadresse und Geburtsdatum. Sie können diese Einwilligung jederzeit widerrufen. Ein Widerruf hat zur Folge, dass wir Ihre Daten ab diesem Zeitpunkt zu oben genannten Zwecken nicht mehr verarbeiten. Ich nehme zur Kenntnis, dass diese Einwilligung jederzeit ohne Angaben von Gründen durch Nachricht an info[at]fairerben.at widerrufen werden kann.
        Die Einwilligung ist gemäß mehreren Entscheidungen des Bundesverwaltungsgerichts sowie Art 1-7 DSGVO eine wichtige Rechtsgrundlage für die Verarbeitung personenbezogener Daten. Sie legitimiert die Verarbeitung "für einen oder mehrere bestimmte Zwecke".
      </p>
      <mat-checkbox [(ngModel)]="accepted">
        Ich akzeptiere den Einwilligungserklärung
      </mat-checkbox>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">Abbrechen</button>
      <button
        mat-flat-button
        color="primary"
        [disabled]="!accepted"
        (click)="accept()"
      >
        Akzeptieren
      </button>
    </mat-dialog-actions>
  `,
})
export class DisclaimerDialogComponent {
  accepted = false;

  constructor(
    private dialogRef: MatDialogRef<DisclaimerDialogComponent>,
    private router: Router
  ) {}

  accept() {
    this.dialogRef.close(); // close the dialog
    this.router.navigate(['/home']); // navigate directly
  }

  cancel() {
    this.dialogRef.close();
  }
}
