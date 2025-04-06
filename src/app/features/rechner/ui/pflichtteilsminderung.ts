import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Persen } from '../rechner-page/rechner-page.component';
import { ProfilePicComponent } from './icon';


@Component({
  imports: [CommonModule, MatCheckboxModule, FormsModule, ProfilePicComponent, ],
  selector: 'app-pflichtteilsmilderung',
  template: `
    <section>
      <h3>Bitte beantworten Sie die Frage für jede Person</h3>
      <div class="persons-container">
        <div class="persons-list">
          <div
            class="person-box"
            *ngFor="let person of personenListe; let i = index">
            <div class="person-name">
              <app-profile-pic [personenArt]="person.Art.PersonenArt">
              </app-profile-pic
              >{{ person.Art.name || person.Art.PersonenArt }}
            </div>
            <div class="person-type">{{ person.Art.PersonenArt }}</div>
            <div class="person-exclusion-options">
              <p>
                <mat-checkbox
                  [(ngModel)]="person.Pflichtanteilsminderung"
                  name="verstorben"
                  >Hatte diese Person und der Verstorbene zu keiner Zeit oder
                  über einen längeren Zeitraum vor dem Tod des Verstorbenen kein
                  familiäres Naheverhältnis, wie es zwischen Familienangehörigen
                  üblich ist?
                </mat-checkbox>
              </p>
              <br />
              <p>
                <mat-checkbox
                  [(ngModel)]="person.Pflichtanteilsminderung"
                  name="verstorben"
                  >Hat der Verstorbene den Kontakt zu dieser Person ohne
                  berechtigten Grund gemieden oder selbst Anlass für den
                  fehlenden Kontakt gegeben?
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
export class PflichtteilsmilderungComponent {
  @Input() personenListe: Persen[] = [];
}
