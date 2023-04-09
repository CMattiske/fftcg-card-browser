import { Component, Output, EventEmitter } from '@angular/core';

import { Filter } from '../filter';
import { Card } from '../../cards/card';

class CostsFilter implements Filter {
  costs: number[] = [];

  get isRelevant(): boolean {
    return this.costs.length > 0;
  }

  satisfies(card: Card): boolean {
    return this.costs.includes(card.cost);
  }
}

@Component({
  selector: 'app-filter-cost',
  templateUrl: './filter-cost.component.html',
  styleUrls: ['./filter-cost.component.scss']
})
export class FilterCostComponent {
  @Output() change: EventEmitter<Filter> = new EventEmitter<Filter>();

  private myCostsFilter: CostsFilter = new CostsFilter();

  protected get costs(): number[]
  {
    return this.myCostsFilter.costs;
  }

  protected set costs(value: number[])
  {
    this.myCostsFilter.costs = value;
    this.change.emit(this.myCostsFilter);
  }
}
