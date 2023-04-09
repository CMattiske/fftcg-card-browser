import { Component, Output, EventEmitter } from '@angular/core';

import { CardElement } from '../../cards/card-element';
import { ImagesService } from '../../images.service';
import { Filter } from '../filter';
import { Card } from '../../cards/card';

class ElementsFilter implements Filter {
  elements: CardElement[] = [];

  get isRelevant(): boolean {
    return this.elements.length > 0;
  }

  satisfies(card: Card): boolean {
    return this.elements.some(element => card.elements.includes(element))
  }
}

@Component({
  selector: 'app-filter-elements',
  templateUrl: './filter-elements.component.html',
  styleUrls: ['./filter-elements.component.scss']
})
export class FilterElementsComponent {
  @Output() change: EventEmitter<Filter> = new EventEmitter<Filter>();

  protected ElementEnum = CardElement;

  private myElementsFilter: ElementsFilter = new ElementsFilter();

  constructor(private imagesService: ImagesService)
  {}

  protected get elements(): CardElement[]
  {
    return this.myElementsFilter.elements;
  }

  protected set elements(value: CardElement[])
  {
    this.myElementsFilter.elements = value;
    this.change.emit(this.myElementsFilter);
  }

  protected elementImage(element: CardElement): string {
    return this.imagesService.elementImage(element);
  }
}
