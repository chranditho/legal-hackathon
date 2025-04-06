import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { Persen, PersonType } from '../rechner-page/rechner-page.component';
import { ProfilePicComponent } from "./icon";

@Component({
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonToggleModule,
    ProfilePicComponent
],
  selector: 'app-nachkommen',
  template: `
    <section>
      <h3>Bitte geben Sie die Nachkommen der jeweiligen Personen an</h3>
      <div class="persons-container">
        <div class="persons-list">
          <div
            class="person-box"
            *ngFor="let person of filteredPersonenListe; let i = index">
            <div
              *ngIf="
                person.Art.name &&
                (person.Art.name.toLowerCase().includes('geschwister') ||
                  person.Art.name.toLowerCase().includes('kinder'))
              ">
              <div class="person-name">
              <app-profile-pic [personenArt]="person.Art.PersonenArt">
              </app-profile-pic>{{ person.Art.name || person.Art.PersonenArt }}
              </div>
              <div class="person-type">{{ person.Art.PersonenArt }}</div>
              <div class="person-exclusion-options">
                <p
                  *ngIf="
                    !person.Art.name.toLowerCase().includes('cousin') ||
                    person.Art.name.toLowerCase().includes('kinder')
                  ">
                  <mat-button-toggle-group
                    (change)="onToggleChange($event, person.Art.name)">
                    <mat-button-toggle
                      *ngFor="let num of anzahlOptions"
                      [value]="num"
                      >{{ num }}</mat-button-toggle
                    >
                  </mat-button-toggle-group>
                </p>
              </div>
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
export class NachkommenComponent {
  @Input() personenListe: Persen[] = [];
  @Output() personenListeChange = new EventEmitter<Persen[]>();

  onToggleChange($event: MatButtonToggleChange, name: String) {
    if (name.toLowerCase().includes('kinder')) {
      // Create a new array instead of modifying the existing one
      const newList = this.personenListe.filter(
        p => !p.Art.name.toLowerCase().includes(name.toLowerCase() + ' enkel')
      );

      for (let i = 0; i < $event.value; i++) {
        const personType = new PersonType(
          'Enkel',
          `${name + ' Enkel'} ${i + 1}`
        );
        const person = new Persen(personType);
        newList.push(person);
      }

      // Emit the new list to the parent
      this.personenListeChange.emit(newList);
    }

    if (name.toLocaleLowerCase().includes('geschwister')) {
      this.personenListe = this.personenListe.filter(
        p =>
          !p.Art.name
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase() + ' cousin')
      );

      console.log(this.personenListe);

      for (let i = 0; i < $event.value; i++) {
        const personType = new PersonType(
          'Enkel',
          `${name + ' Cousin'} ${i + 1}`
        );
        const person = new Persen(personType);
        this.personenListe.push(person);
      }
    }
  }
  anzahlOptions: number[] = [1, 2, 3, 4, 5, 6];

  get filteredPersonenListe() {
    return this.personenListe.filter(
      p =>
        p.Art.name &&
        (p.Art.name.toLowerCase().includes('geschwister') ||
          p.Art.name.toLowerCase().includes('kinder'))
    );
  }
}
