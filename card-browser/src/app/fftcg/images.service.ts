import { Injectable } from '@angular/core';
import { Card } from './cards/card';
import { CardElement } from './cards/card-element';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor() { }

  cardImage(card: Card): string {
    return `assets/images/cards/${card.setID}.jpg`;
  }

  elementImage(element: CardElement) {
    return `assets/images/elements/symbol_${element.toLowerCase()}.png`;
  }

  costElement(element: CardElement) {
    return `assets/images/symbols/cost_${element.toLowerCase()}.png`;
  }

  costDull(): string {
    return `assets/images/symbols/cost_dull.png`;
  }

  costSpecial(): string {
    return `assets/images/symbols/cost_special.png`;
  }

  exBurst(): string {
    return `assets/images/symbols/exburst.png`;
  }
}
