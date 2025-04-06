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
  ],
  templateUrl: './rechner-page.component.html',
  styles: `
    :host {
      display: block;
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
  schenkungenWert = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Z0-9]{10}$/), // Adjust pattern to your material number format
  ]);

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
}

// Class implementation
export class Persen implements IPersen {
  Art: PersonType;
  Vorverstorben: boolean;
  Erbwuerdig: boolean;
  Enterbung: boolean;
  Pflichtanteilsminderung: boolean;
  Pflichtanteilsberechtigt: boolean;

  constructor(
    art: PersonType = new PersonType(),
    vorverstorben = false,
    erbwuerdig = false,
    enterbung = false,
    pflichtanteilsminderung = false,
    pflichtanteilsberechtigt = false
  ) {
    this.Art = art;
    this.Vorverstorben = vorverstorben;
    this.Erbwuerdig = erbwuerdig;
    this.Enterbung = enterbung;
    this.Pflichtanteilsminderung = pflichtanteilsminderung;
    this.Pflichtanteilsberechtigt = pflichtanteilsberechtigt;
  }
}
