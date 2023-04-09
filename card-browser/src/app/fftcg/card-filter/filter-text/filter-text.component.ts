import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';

import { Card } from '../../cards/card';
import { Filter } from '../filter';

class TextFilter implements Filter {
  textFragments: Array<string> = [];
  all: boolean = false;

  get isRelevant(): boolean {
    return this.textFragments.length > 0;
  }

  satisfies(card: Card): boolean {
    return this.all
    ? this.textFragments.every(v => card.text.toUpperCase().includes(v.toUpperCase()))
    : this.textFragments.some(v => card.text.toUpperCase().includes(v.toUpperCase()));
  }
}

@Component({
  selector: 'app-filter-text',
  templateUrl: './filter-text.component.html',
  styleUrls: ['./filter-text.component.scss']
})
export class FilterTextComponent {
  @Output() change: EventEmitter<Filter> = new EventEmitter<Filter>();

  protected addOnBlur = true;
  protected readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private myTextFilter: TextFilter = new TextFilter();

  protected get textFragments(): string[] {
    return this.myTextFilter.textFragments;
  }

  protected get all(): boolean {
    return this.myTextFilter.all;
  }

  protected set all(value: boolean) {
    this.myTextFilter.all = value;
    this._onTextFilterChanged();
  }

  protected onAdd(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.myTextFilter.textFragments.push(value);
    }

    event.chipInput!.clear();

    this._onTextFilterChanged();
  }

  protected onRemove(textFragment: string): void {
    const index = this.myTextFilter.textFragments.indexOf(textFragment);

    if (index >= 0) {
      this.myTextFilter.textFragments.splice(index, 1);
    }

    this._onTextFilterChanged();
  }

  protected onEdit(textFragment: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.onRemove(textFragment);
      return;
    }

    const index = this.myTextFilter.textFragments.indexOf(textFragment);
    if (index > 0) {
      this.myTextFilter.textFragments[index] = value;
    }

    this._onTextFilterChanged();
  }

  private _onTextFilterChanged(): void {
    this.change.emit(this.myTextFilter);
  }
}
