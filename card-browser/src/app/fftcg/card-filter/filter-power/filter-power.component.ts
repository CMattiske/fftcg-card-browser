import { Component, EventEmitter, Output } from '@angular/core';

import { Filter } from '../filter';
import { Card } from '../../cards/card';

enum Comparator {
  EQUAL = "=",
  LESS = "<",
  GREATER = ">",
  LESS_OR_EQUAL = "<=",
  GREATER_OR_EQUAL = ">=",
}

class PowerFilter implements Filter {
  value: number | undefined;
  comparator: Comparator = Comparator.EQUAL;

  get isRelevant(): boolean {
    return this.value != null;
  }

  satisfies(card: Card): boolean {
    if (this.value == null) { return true; }

    if (card.power == null) return false;

    switch (this.comparator) {
      case Comparator.EQUAL:
          return card.power === this.value;
      case Comparator.LESS:
          return card.power < this.value;
      case Comparator.GREATER:
          return card.power > this.value;
      case Comparator.LESS_OR_EQUAL:
          return card.power <= this.value;
      case Comparator.GREATER_OR_EQUAL:
          return card.power >= this.value;
    }
  }
}

@Component({
  selector: 'app-filter-power',
  templateUrl: './filter-power.component.html',
  styleUrls: ['./filter-power.component.scss']
})
export class FilterPowerComponent {
  @Output() change: EventEmitter<Filter> =
    new EventEmitter<Filter>();
  
  private myPowerFilter: PowerFilter = new PowerFilter();

  protected get value(): number | undefined {
    return this.myPowerFilter.value;
  }

  protected set value(value: number | undefined) {
    this.myPowerFilter.value = value;
    this._onPowerFilterChanged();
  }

  protected get comparator(): Comparator {
    return this.myPowerFilter.comparator;
  }

  protected set comparator(value: Comparator) {
    this.myPowerFilter.comparator = value;
    this._onPowerFilterChanged();
  }

  private _onPowerFilterChanged(): void {
    this.change.emit(this.myPowerFilter);
  }
}
