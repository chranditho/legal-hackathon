import { Component, inject } from '@angular/core';
import {
  FormBuilder,
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
  ],
  templateUrl: './rechner-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class RechnerPageComponent {
  private readonly _formBuilder = inject(FormBuilder);

  ehepartnerStepGroup = this._formBuilder.group({
    ehepartnerVerstorben: ['', Validators.required],
    nachkommenPartner: ['', Validators.required],
  });
  ehepartnerVerstorben = this._formBuilder.group({
    verstorbenJa: ['', Validators.required],
    verstorbenNein: ['', Validators.required],
  });
  ehepartnerNachkommen = this._formBuilder.group({
    nachkommenJa: ['', Validators.required],
  });
  erbunwuerdig = this._formBuilder.group({
    erbunwuerdigJa: ['', Validators.required],
    erbunwuerdigNein: ['', Validators.required],
  });

  readonly verwandschaftsverhaeltnisse = this._formBuilder.group({
    ehepartner: false,
    kinder: false,
    eltern: false,
    nachkommen: false,
    adoptivkind: false,
  });

  isLinear = true;
}
