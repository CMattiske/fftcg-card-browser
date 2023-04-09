import { Component, EventEmitter, Output } from '@angular/core';

import { Filter } from '../filter';
import { Card } from '../../cards/card';

class FlagsFilter implements Filter {
  exBurst: boolean = false;
  multiUnit: boolean = false;
  multiElement: boolean = false;

  get isRelevant(): boolean {
    return true;
  }

  satisfies(card: Card): boolean {
    if (this.exBurst && !card.exBurst) {
      return false;
    }
    if (this.multiUnit && !card.multiCard) {
      return false;
    }
    if (this.multiElement && card.elements.length < 2) {
      return false;
    }

    return true;
  }
}

@Component({
  selector: 'app-filter-flags',
  templateUrl: './filter-flags.component.html',
  styleUrls: ['./filter-flags.component.scss']
})
export class FilterFlagsComponent {
  @Output() change: EventEmitter<Filter> = new EventEmitter<Filter>();

  private myFlagsFilter: FlagsFilter = new FlagsFilter();

  protected get exBurst(): boolean {
    return this.myFlagsFilter.exBurst;
  }

  protected set exBurst(value: boolean) {
    this.myFlagsFilter.exBurst = value;
    this._onFlagsFilterChanged();
  }

  protected get multiUnit(): boolean {
    return this.myFlagsFilter.multiUnit;
  }

  protected set multiUnit(value: boolean) {
    this.myFlagsFilter.multiUnit = value;
    this._onFlagsFilterChanged();
  }

  protected get multiElement(): boolean {
    return this.myFlagsFilter.multiElement;
  }

  protected set multiElement(value: boolean) {
    this.myFlagsFilter.multiElement = value;
    this._onFlagsFilterChanged();
  }

  private _onFlagsFilterChanged(): void {
    this.change.emit(this.myFlagsFilter);
  }
}
