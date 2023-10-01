import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayJobs'
})
export class DisplayJobsPipe implements PipeTransform {

  transform(value: string[]): string {
    return value.join(" / ");
  }

}
