import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardText'
})
export class CardTextPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/_.*?_/gm, (substring: string): string => {
      return "<i>" + substring.substring(1, substring.length - 1) + "</i>";
    }).replace(/\*\*.*?\*\*/gm, (substring: string): string => {
      return "<b>" + substring.substring(2, substring.length - 2) + "</b>";
    });
  }

}
