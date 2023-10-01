import { Pipe, PipeTransform } from '@angular/core';
import { ImagesService } from '../images.service';
import { CardElement } from '../cards/card-element';

@Pipe({
  name: 'cardText'
})
export class CardTextPipe implements PipeTransform {

  constructor(private imagesService: ImagesService) {}

  transform(value: string): string {
    return value
    // Italics
    .replace(/_.*?_/gm, (substring: string): string => {
      return "<i>" + substring.substring(1, substring.length - 1) + "</i>";
    })
    // Bold
    .replace(/\*\*.*?\*\*/gm, (substring: string): string => {
      return "<b>" + substring.substring(2, substring.length - 2) + "</b>";
    })
    // Newlines
    .replace(/\n/g, "<br>")
    // Cost symbols
    .replace(/{S}/gm, `<img height="18px" src="${this.imagesService.costSpecial()}"/>`)
    .replace(/{D}/gm, `<img height="18px" src="${this.imagesService.costDull()}"/>`)
    .replace(/{f}/gm, `<img height="18px" src="${this.imagesService.costElement(CardElement.FIRE)}"/>`)
    .replace(/{i}/gm, `<img height="18px" src="${this.imagesService.costElement(CardElement.ICE)}"/>`)
    .replace(/{w}/gm, `<img height="18px" src="${this.imagesService.costElement(CardElement.WIND)}"/>`)
    .replace(/{e}/gm, `<img height="18px" src="${this.imagesService.costElement(CardElement.EARTH)}"/>`)
    .replace(/{l}/gm, `<img height="18px" src="${this.imagesService.costElement(CardElement.LIGHTNING)}"/>`)
    .replace(/{u}/gm, `<img height="18px" src="${this.imagesService.costElement(CardElement.WATER)}"/>`)
    // Other symbols
    .replace(/{EX}/gm, `<img height="18px" src="${this.imagesService.exBurst()}"/>`)
    // Special ability names
    .replace(/\[.*?\]/gm, (substring: string): string => {
      return "<i><b><font color='#F58B11'>" + substring.substring(1, substring.length - 1) + "</i></b></font>";
    });
  }

}
