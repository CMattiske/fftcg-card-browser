import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayCategories'
})
export class DisplayCategoriesPipe implements PipeTransform {

  transform(value: string[]): string {
    return value.join(" \u2022 ");
  }

}
