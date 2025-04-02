import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'demo'
})
export class DemoPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString() + ' transformed';
  }

}
