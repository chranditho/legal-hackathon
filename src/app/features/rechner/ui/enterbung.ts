import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Persen } from '../rechner-page/rechner-page.component';

@Component({
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  selector: 'app-enterbung',
  template: `
    <section>
      <h3>Bitte wählen Sie die enterbten Personen aus</h3>
      <div class="persons-container">
        <div class="persons-list">
          <div
            class="person-box"
            *ngFor="let person of personenListe; let i = index">
            <div class="person-name">
              {{ person.Art.name || person.Art.PersonenArt }}
            </div>
            <div class="person-type">{{ person.Art.PersonenArt }}</div>
            <div class="person-exclusion-options">
              <p>
                <mat-checkbox [(ngModel)]="person.Enterbung" name="verstorben"
                  >Hat diese Person gegen den Verstorbenen eine vorsätzliche Straftat begangen, die mit mehr als einem Jahr Freiheitsstrafe bedroht ist? </mat-checkbox>
              </p>
              <br>
              <p>
                <mat-checkbox [(ngModel)]="person.Enterbung" name="verstorben"
                  >Hat diese Person gegen Ehepartner, eingetragene Partner, Lebensgefährten oder Verwandte in gerader Linie, Geschwister des Verstorbenen oder deren nahe Angehörige eine vorsätzliche Straftat begangen, die mit mehr als einem Jahr Freiheitsstrafe bedroht ist?  </mat-checkbox>
              </p>
              <br>
              <p>
                <mat-checkbox [(ngModel)]="person.Enterbung" name="verstorben"
                  >Hat diese Person absichtlich versucht, den letzten Willen des Verstorbenen zu vereiteln?   </mat-checkbox>
              </p>
              <br>
              <p>
                <mat-checkbox [(ngModel)]="person.Enterbung" name="verstorben"
                  >Hat diese Person dem Verstorbenen in verwerflicher Weise schweres seelisches Leid zugefügt?    </mat-checkbox>
              </p>
              <br>
              <p>
                <mat-checkbox [(ngModel)]="person.Enterbung" name="verstorben"
                  >Hat diese Person Ihre familienrechtlichen Pflichten gegenüber dem Verstorbenen gröblich vernachlässigt?     </mat-checkbox>
              </p>
              <br>
              <p>
                <mat-checkbox [(ngModel)]="person.Enterbung" name="verstorben"
                  >Wurde diese Person wegen einer oder mehrerer vorsätzlich begangener Straftaten zu einer lebenslangen oder 20-jährigen Freiheitsstrafe verurteilt? </mat-checkbox>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      h3 {
        margin-top: 24px;
        margin-bottom: 16px;
      }

      .persons-container {
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 16px;
        background-color: #f5f5f5;
      }

      .persons-list {
        display: flex;
        overflow-x: auto;
        padding-bottom: 8px;
      }

      .person-box {
        min-width: 250px;
        margin-right: 16px;
        padding: 12px;
        border-radius: 4px;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .person-name {
        font-weight: 500;
        margin-bottom: 4px;
      }

      .person-type {
        font-size: 12px;
        color: #757575;
        margin-bottom: 8px;
      }

      .person-exclusion-options {
        display: flex;
        flex-direction: column;
      }

      .person-exclusion-options mat-checkbox {
        margin-bottom: 4px;
        font-size: 14px;
      }

      .actions {
        margin-top: 32px;
      }
    `,
  ],
})
export class EnterbungComponent {
  @Input() personenListe: Persen[] = [];
}
