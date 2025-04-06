import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added this line
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { AusschlussgruendeComponent } from '../ui/ausschlussgründe';
import { ErbunwuerdigComponent } from '../ui/erbunwürdigkeit';
import { NachkommenComponent } from '../ui/nachkommen';
import { EnterbungComponent } from '../ui/enterbung';
import { PflichtteilsmilderungComponent } from '../ui/pflichtteilsminderung';
import { SchenkungenComponent } from '../ui/schenkungen';
import { ErbeComponent } from '../ui/erbe';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-rechner-page',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    CommonModule, // Added this line
    ReactiveFormsModule,
    MatButtonToggleModule, // Added for number selection
    AusschlussgruendeComponent,
    ErbunwuerdigComponent,
    NachkommenComponent,
    EnterbungComponent,
    PflichtteilsmilderungComponent,
    SchenkungenComponent,
    ErbeComponent,
  ],
  templateUrl: './rechner-page.component.html',
  styles: `
    :host {
      display: block;
    }

    .anzahl-field {
      margin-left: 24px;
      margin-top: 8px;
      margin-bottom: 20px;
    }

    .anzahl-label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }

    /* Style for button toggle group */
    .mat-button-toggle-group {
      border-radius: 4px;
      overflow: hidden;
    }

    .mat-button-toggle {
      width: 40px;
    }

    .actions {
      margin-top: 32px;
    }

    /* For better responsive behavior */
    @media (max-width: 768px) {
      .anzahl-field {
        margin-left: 20px;
      }
    }
  `,
})
export class RechnerPageComponent implements OnInit {
  public verwandtschaftsverhaeltnisse: FormGroup;
  personenListe: Persen[] = [];
  anzahlOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  vermoegenswert = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Z0-9]{10}$/), // Adjust pattern to your material number format
  ]);

  schuldensswert = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Z0-9]{10}$/), // Adjust pattern to your material number format
  ]);

  // Set this based on your Angular version
  isAngular15OrHigher = false;
  isLinear = true;
  private readonly _formBuilder = inject(FormBuilder);
  ehepartnerStepGroup = this._formBuilder.group({
    ehepartnerVerstorben: [null, Validators.required],
    nachkommenPartner: ['', Validators.required],
    ehepartnerNachkommen: [null, Validators.required],
  });
  erbunwuerdig = this._formBuilder.group({
    erbunwuerdig1: ['', Validators.required],
    erbunwuerdig2: ['', Validators.required],
    erbunwuerdig3: ['', Validators.required],
    erbunwuerdig4: ['', Validators.required],
  });
  enterbung = this._formBuilder.group({
    enterbtJa: ['', Validators.required],
    enterbtNein: ['', Validators.required],
  });
  pflichtTeilsMinderungKontakt = this._formBuilder.group({
    kontaktJa: ['', Validators.required],
    kontaktNein: ['', Validators.required],
  });
  pflichtTeilsMinderungABGB = this._formBuilder.group({
    abgbJa: ['', Validators.required],
    abgbNein: ['', Validators.required],
  });

  // A flag to determine which Angular Material version syntax to use

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.verwandtschaftsverhaeltnisse = this.fb.group({
      ehepartner: [false],
      kinder: [false],
      mutter: [false],
      vater: [false],
      geschwister: [false],
      geschwisterAnzahl: [1],
      nachkommen: [false],
      nachkommenAnzahl: [1],
    });
  }

  updatePersonenListe(newList: Persen[]) {
    this.personenListe = newList;
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.setupFormListeners();
  }

  public addMultiplePersons(
    personenArt:
      | 'Ehegatte'
      | 'Lebensgefährte'
      | 'Mutter'
      | 'Geschwister'
      | 'Vater'
      | 'Kinder',
    anzahl: number
  ): void {
    for (let i = 0; i < anzahl; i++) {
      const personType = new PersonType(personenArt, `${personenArt} ${i + 1}`);
      const person = new Persen(personType);
      this.personenListe.push(person);
    }
    console.log(`${anzahl} persons of type ${personenArt} added`);
    console.log('Current list:', this.personenListe);
  }

  private initForm(): void {
    // Form already initialized in constructor
  }

  private setupFormListeners(): void {
    // Monitor checkbox changes
    this.verwandtschaftsverhaeltnisse
      .get('ehepartner')
      ?.valueChanges.subscribe(checked => {
        if (checked) {
          this.addPerson('Ehegatte');
        } else {
          this.removePersonByType('Ehegatte');
        }
      });

    this.verwandtschaftsverhaeltnisse
      .get('vater')
      ?.valueChanges.subscribe(checked => {
        if (checked) {
          this.addPerson('Vater');
        } else {
          this.removePersonByType('Vater');
        }
      });

    this.verwandtschaftsverhaeltnisse
      .get('mutter')
      ?.valueChanges.subscribe(checked => {
        if (checked) {
          this.addPerson('Mutter');
        } else {
          this.removePersonByType('Mutter');
        }
      });

    this.verwandtschaftsverhaeltnisse
      .get('kinder')
      ?.valueChanges.subscribe(checked => {
        if (checked) {
          this.addPerson('Lebensgefährte');
        } else {
          this.removePersonByType('Lebensgefährte');
        }
      });

    this.verwandtschaftsverhaeltnisse
      .get('geschwister')
      ?.valueChanges.subscribe(checked => {
        if (checked) {
          const anzahl =
            this.verwandtschaftsverhaeltnisse.get('geschwisterAnzahl')?.value ||
            1;
          this.addMultiplePersons('Geschwister', anzahl);
        } else {
          this.removePersonByType('Geschwister');
        }
      });

    this.verwandtschaftsverhaeltnisse
      .get('geschwisterAnzahl')
      ?.valueChanges.subscribe(anzahl => {
        if (this.verwandtschaftsverhaeltnisse.get('geschwister')?.value) {
          this.removePersonByType('Geschwister');
          this.addMultiplePersons('Geschwister', anzahl);
        }
      });

    this.verwandtschaftsverhaeltnisse
      .get('nachkommen')
      ?.valueChanges.subscribe(checked => {
        if (checked) {
          const anzahl =
            this.verwandtschaftsverhaeltnisse.get('nachkommenAnzahl')?.value ||
            1;
          this.addMultiplePersons('Kinder', anzahl);
        } else {
          this.removePersonByType('Kinder');
        }
      });

    this.verwandtschaftsverhaeltnisse
      .get('nachkommenAnzahl')
      ?.valueChanges.subscribe(anzahl => {
        if (this.verwandtschaftsverhaeltnisse.get('nachkommen')?.value) {
          this.removePersonByType('Kinder');
          this.addMultiplePersons('Kinder', anzahl);
        }
      });
  }

  private addPerson(
    personenArt:
      | 'Ehegatte'
      | 'Lebensgefährte'
      | 'Mutter'
      | 'Vater'
      | 'Geschwister'
      | 'Kinder'
  ): void {
    const personType = new PersonType(personenArt, '');
    const person = new Persen(personType);
    this.personenListe.push(person);
    console.log('Person added:', person);
    console.log('Current list:', this.personenListe);
  }

  /*readonly verwandtschaftsverhaeltnisse = this._formBuilder.group({
    ehepartner: false,
    kinder: false,
    eltern: false,
    nachkommen: false,
    adoptivkind: false,
  });
  */

  private removePersonByType(personenArt: string): void {
    // Remove all persons of the specified type
    this.personenListe = this.personenListe.filter(
      p => p.Art.PersonenArt !== personenArt
    );
    console.log(`All persons with type ${personenArt} removed`);
    console.log('Current list:', this.personenListe);
  }

  filteredPersons: Persen[] = [];

  public calculateErbe() {
    console.log('calc');
    this.filteredPersons = this.personenListe
      .filter(p => !p.Enterbung)
      .filter(p => !p.Erbwuerdig)
      .filter(p => !p.Pflichtanteilsberechtigt)
      .filter(p => !p.Vorverstorben);
    console.log('filtered List:');
    console.log(this.filteredPersons);
    console.log('case');
    //case1
    if (
      this.filteredPersons.some(
        person => person.Art.PersonenArt === 'Ehegatte'
      ) &&
      this.filteredPersons.some(person => person.Art.PersonenArt === 'Kinder')
    ) {
      console.log('case 1');
      console.log('Ehegatte');
      this.filteredPersons.filter(
        person => person.Art.PersonenArt === 'Ehegatte'
      )[0].Erbwert = Number(this.vermoegenswert.value) / 3;
      console.log(
        'Ehegatte erbe: ' +
          this.filteredPersons.filter(
            person => person.Art.PersonenArt === 'Ehegatte'
          )[0].Erbwert
      );

      console.log('Erbwert ');
      this.vermoegenswert.setValue(
        ((Number(this.vermoegenswert.value) * 2) / 3).toString()
      );

      console.log('current rest Erbwert: ' + this.vermoegenswert.value);

      //ist gatte erbminderung?
      if (
        this.filteredPersons.filter(
          person => person.Art.PersonenArt === 'Ehegatte'
        )[0].Pflichtanteilsminderung
      ) {
        this.filteredPersons.filter(
          person => person.Art.PersonenArt === 'Ehegatte'
        )[0].Erbwert =
          this.filteredPersons.filter(
            person => person.Art.PersonenArt === 'Ehegatte'
          )[0].Erbwert / 2;

        this.vermoegenswert.setValue(
          (
            Number(this.vermoegenswert.value) +
            this.filteredPersons.filter(
              person => person.Art.PersonenArt === 'Ehegatte'
            )[0].Erbwert
          ).toString()
        );
      }

      let alreadyUsed = 0;

      this.filteredPersons
        .filter(person => person.Art.PersonenArt === 'Kinder')
        .forEach(kind => {
          kind.Erbwert =
            Number(this.vermoegenswert.value) /
            (this.filteredPersons.filter(
              person => person.Art.PersonenArt === 'Kinder'
            ).length -
              alreadyUsed);
          alreadyUsed++;

          console.log('wert 2 kind: ' + this.vermoegenswert.value);
          this.vermoegenswert.setValue(
            (
              (Number(this.vermoegenswert.value) *
                (this.filteredPersons.filter(
                  person => person.Art.PersonenArt === 'Kinder'
                ).length -
                  1)) /
              this.filteredPersons.filter(
                person => person.Art.PersonenArt === 'Kinder'
              ).length
            ).toString()
          );
        });

      console.log(this.filteredPersons);
    }
  }
}

// PersonType class definition
export class PersonType {
  PersonenArt:
    | 'Ehegatte'
    | 'Lebensgefährte'
    | 'Mutter'
    | 'Vater'
    | 'Geschwister'
    | 'Enkel'
    | 'Cousin'
    | 'Kinder';
  name: string;

  constructor(
    personenArt:
      | 'Ehegatte'
      | 'Lebensgefährte'
      | 'Mutter'
      | 'Vater'
      | 'Geschwister'
      | 'Kinder'
      | 'Enkel'
      | 'Cousin' = 'Ehegatte',
    name = ''
  ) {
    this.PersonenArt = personenArt;
    this.name = name;
  }
}

// Interface definition
export interface IPersen {
  Art: PersonType;
  Vorverstorben: boolean;
  Erbwuerdig: boolean;
  Enterbung: boolean;
  Pflichtanteilsminderung: boolean;
  Pflichtanteilsberechtigt: boolean;
  Erbwert: number;
}

// Class implementation
export class Persen implements IPersen {
  Art: PersonType;
  Vorverstorben: boolean;
  Erbwuerdig: boolean;
  Enterbung: boolean;
  Pflichtanteilsminderung: boolean;
  Pflichtanteilsberechtigt: boolean;
  Erbwert: number;

  constructor(
    art: PersonType = new PersonType(),
    vorverstorben = false,
    erbwuerdig = false,
    enterbung = false,
    pflichtanteilsminderung = false,
    pflichtanteilsberechtigt = false,
    erbwert = 0
  ) {
    this.Art = art;
    this.Vorverstorben = vorverstorben;
    this.Erbwuerdig = erbwuerdig;
    this.Enterbung = enterbung;
    this.Pflichtanteilsminderung = pflichtanteilsminderung;
    this.Pflichtanteilsberechtigt = pflichtanteilsberechtigt;
    this.Erbwert = erbwert;
  }
}
