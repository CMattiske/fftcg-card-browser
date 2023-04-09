import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(message: string): void
  {
    // :MYTODO: Add time
    console.log(`${message}`);
  }

  warning(message: string): void
  {
    console.log(`WARNING: ${message}`);
  }

  error(message: string): void
  {
    console.log(`ERROR: ${message}`);
  }
}
