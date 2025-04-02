import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  calculateSomething(input: number): number {
    // Example calculation logic
    return input * 2;
  }

  getSomething(): string {
    // Example string retrieval logic
    return 'Hello from DemoService!';
  }
}
