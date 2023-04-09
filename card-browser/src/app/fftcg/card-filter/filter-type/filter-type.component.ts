import { Component, EventEmitter, Output } from '@angular/core';

import { CardType } from '../../cards/card-type';
import { Card } from '../../cards/card';
import { Filter } from '../filter';

class TypeFilter implements Filter {
  types: CardType[] = [];

  get isRelevant(): boolean {
    return this.types.length > 0;
  }

  satisfies(card: Card): boolean {
    return this.types.includes(card.type);
  }
}

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrls: ['./filter-type.component.scss']
})
export class FilterTypeComponent {
  @Output() change: EventEmitter<Filter> = new EventEmitter<Filter>();

  protected TypeEnum = CardType;

  private myTypeFilter: TypeFilter = new TypeFilter();

  get types(): CardType[] {
    return this.myTypeFilter.types;
  }

  set types(value: CardType[]) {
    this.myTypeFilter.types = value;
    this.change.emit(this.myTypeFilter);
  }
}
