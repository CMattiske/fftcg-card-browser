import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToEmpty'
})
export class NullToEmptyPipe implements PipeTransform {

  transform<T>(value: T[] | null): T[] {
    return value ?? [];
  }

}
