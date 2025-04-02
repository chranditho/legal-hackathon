import { Injectable } from '@angular/core';
import { Rechner } from './rechner';

@Injectable({
  providedIn: 'root',
})
export class RechnerService implements Rechner {
  constructor() {}
}
