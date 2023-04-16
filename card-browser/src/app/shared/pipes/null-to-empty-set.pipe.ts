import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToEmptySet'
})
export class NullToEmptySetPipe implements PipeTransform {

  transform<T>(value: Set<T> | null, ...args: unknown[]): Set<T> {
    return value ?? new Set<T>();
  }

}
