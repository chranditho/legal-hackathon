import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Persen } from '../rechner-page/rechner-page.component';
import { ProfilePicComponent } from './icon';

@Component({
  imports: [CommonModule, MatCheckboxModule, FormsModule, ProfilePicComponent],
  selector: 'app-erbunwuerdig',
  template: `
    <section>
      <h3>Bitte beantworten Sie die Fragen für jede Person</h3>
      <div class="persons-container">
        <div class="persons-list">
          <div
            class="person-box"
            *ngFor="let person of personenListe; let i = index">
            <div class="person-name">
              <app-profile-pic [personenArt]="person.Art.PersonenArt">
              </app-profile-pic>
              {{ person.Art.name || person.Art.PersonenArt }}
            </div>
            <div class="person-type">{{ person.Art.PersonenArt }}</div>
            <div class="person-exclusion-options">
              <p>
                <mat-checkbox
                  [(ngModel)]="person['Erbwuerdig']"
                  name="erbwuerdig"
                  >Hat diese Person gegen den Ehegatten, eingetragenen Partner,
                  Lebensgefährten oder Verwandte in gerader Linie des
                  Verstorbenen eine vorsätzliche Straftat begangen, die mit mehr
                  als einem Jahr Freiheitsstrafe bedroht ist?
                </mat-checkbox>
              </p>
              <br />
              <p>
                <mat-checkbox
                  [(ngModel)]="person['Erbwuerdig']"
                  name="erbwuerdig"
                  >Hat diese Person dem Verstorbenen in verwerflicher Weise
                  schweres seelisches Leid zugefügt?
                </mat-checkbox>
              </p>
              <br />
              <p>
                <mat-checkbox
                  [(ngModel)]="person['Erbwuerdig']"
                  name="erbwuerdig"
                  >Hat diese Person Ihre Pflichten aus dem Rechtsverhältnis
                  zwischen Eltern und Kindern gegenüber dem Verstorbenen
                  gröblich vernachlässigt?
                </mat-checkbox>
              </p>
              <br />
              <p>
                <mat-checkbox
                  [(ngModel)]="person['Erbwuerdig']"
                  name="erbwuerdig"
                  >War der Verstorbene nicht in der Lage, diese Person zu
                  enterben, und hat er Ihnen auch nicht zu erkennen gegeben,
                  dass er Ihnen verziehen hat?
                </mat-checkbox>
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
export class ErbunwuerdigComponent {
  @Input() personenListe: Persen[] = [];
}
