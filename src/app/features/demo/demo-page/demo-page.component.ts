import {Component, inject} from '@angular/core';
import {DemoUiOneComponent} from '../ui/demo-ui-one/demo-ui-one.component';
import {DemoUiTwoComponent} from '../ui/demo-ui-two/demo-ui-two.component';
import {DemoService} from '../demo.service';

@Component({
  selector: 'app-demo-page',
  imports: [
    DemoUiOneComponent,
    DemoUiTwoComponent
  ],
  templateUrl: './demo-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `
})
export class DemoPageComponent {
  private readonly demoService = inject(DemoService);

  constructor() {
    const calculationResult = this.demoService.calculateSomething(5);
    const getSomethingResult = this.demoService.getSomething();
    console.log('Calculation Result:', calculationResult);
    console.log('Get Something Result:', getSomethingResult);
  }
}
