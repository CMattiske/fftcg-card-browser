import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Card } from '../../cards/card';
import { Filter } from '../filter';
import { CardsService } from '../../cards/cards.service';

export type StringProperty = 'category' | 'job' | 'set' | 'tags';

class StringArrayFilter implements Filter {
  
  stringArray: string[] = [];

  private myProperty!: StringProperty;

  constructor(property: StringProperty) {
    this.myProperty = property;
  }

  get isRelevant(): boolean {
    return this.stringArray.length > 0;
  }

  get property(): StringProperty {
    return this.myProperty;
  }

  set property(value: StringProperty)
  {
    this.myProperty = value;
  }

  satisfies(card: Card): boolean {
    switch (this.property)
    {
      case 'category':
        return this.stringArray.some(str => card.categories.map(
          category => category.toLowerCase()).includes(str.toLowerCase())
        );
      case 'job':
        if (card.jobs == null) return false;
        return this.stringArray.some(str => (card.jobs ?? []).map(
          job => job.toLowerCase()).includes(str.toLowerCase())
        );
      case 'set':
        return this.stringArray.includes(card.set.name);
      case 'tags':
        return this.stringArray.some(str => card.tags.map(
          tag => tag.toLowerCase()).includes(str.toLowerCase())
        );
    }
  }
}

@Component({
  selector: 'app-filter-string-array',
  templateUrl: './filter-string-array.component.html',
  styleUrls: ['./filter-string-array.component.scss']
})
export class FilterStringArrayComponent implements OnInit {
  @Input() property!: StringProperty;
  @Input() options: string[] = [];

  @Output() change: EventEmitter<Filter> = new EventEmitter<Filter>();

  private myStringArrayFilter: StringArrayFilter = new StringArrayFilter(this.property);

  constructor(private cardsService: CardsService) {}

  protected get label(): string {
    switch (this.property)
    {
      case 'category':
        return 'Categories';
      case 'job':
        return 'Jobs';
      case 'set':
        return 'Sets';
      case 'tags':
        return 'Tags';
    }
  }

  protected get stringArray(): string[] {
    return this.myStringArrayFilter.stringArray;
  }

  protected set stringArray(value: string[]) {
    this.myStringArrayFilter.stringArray = value;
    this.change.emit(this.myStringArrayFilter);
  }

  ngOnInit(): void {
    this.myStringArrayFilter.property = this.property;
  }
}