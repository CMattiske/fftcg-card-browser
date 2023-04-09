import { Component, EventEmitter, Output } from '@angular/core';

import { Filter } from '../filter';
import { Card } from '../../cards/card';

class NameFilter implements Filter {
  nameFragment: string = "";
  exact: boolean = false;

  get isRelevant(): boolean {
    return !!this.nameFragment;
  }

  satisfies(card: Card): boolean {
    return this.exact
    ? this.nameFragment.toUpperCase() == card.name.toUpperCase()
    : card.name.toUpperCase().includes(this.nameFragment.toUpperCase());
  }
}

@Component({
  selector: 'app-filter-name',
  templateUrl: './filter-name.component.html',
  styleUrls: ['./filter-name.component.scss']
})
export class FilterNameComponent {
  @Output() change: EventEmitter<Filter> = new EventEmitter<Filter>();
  
  private myNameFilter: NameFilter = new NameFilter();

  protected get nameFragment(): string {
    return this.myNameFilter.nameFragment;
  }

  protected set nameFragment(value: string) {
    this.myNameFilter.nameFragment = value;
    this._onNameFilterChanged();
  }

  protected get exact(): boolean {
    return this.myNameFilter.exact;
  }

  protected set exact(value: boolean) {
    this.myNameFilter.exact = value;
    this._onNameFilterChanged();
  }

  private _onNameFilterChanged(): void {
    this.change.emit(this.myNameFilter);
  }
}
