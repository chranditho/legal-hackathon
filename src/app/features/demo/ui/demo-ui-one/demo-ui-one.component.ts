import {Component} from '@angular/core';
import {DemoPipe} from '../../util/demo.pipe';
import {CurrencyPipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-demo-ui-one',
  imports: [
    DemoPipe,
    CurrencyPipe,
    MatCardModule,
  ],
  templateUrl: './demo-ui-one.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class DemoUiOneComponent {

}
