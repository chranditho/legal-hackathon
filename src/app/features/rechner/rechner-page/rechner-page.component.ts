import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  ],
  templateUrl: './rechner-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class RechnerPageComponent {
  private _formBuilder = inject(FormBuilder);

  erblasserGroup = this._formBuilder.group({
    name: ['', Validators.required],
    landIstOesterreich: [false, Validators.requiredTrue],
  });
  todestagGroup = this._formBuilder.group({
    date: ['', Validators.required],
    datum: new FormControl(new Date()),
    serializedDate: new FormControl(new Date().toISOString()),
  });

  isLinear = true;
}
