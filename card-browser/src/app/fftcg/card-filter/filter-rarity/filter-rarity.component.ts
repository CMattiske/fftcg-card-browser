import { Component, EventEmitter, Output } from '@angular/core';

import { Card } from '../../cards/card';
import { Filter } from '../filter';
import { CardRarity } from '../../cards/card-rarity';

class RarityFilter implements Filter {
  rarities: CardRarity[] = [];

  get isRelevant(): boolean {
    return this.rarities.length > 0;
  }

  satisfies(card: Card): boolean {
    return this.rarities.includes(card.rarity);
  }
}

@Component({
  selector: 'app-filter-rarity',
  templateUrl: './filter-rarity.component.html',
  styleUrls: ['./filter-rarity.component.scss']
})
export class FilterRarityComponent {
  @Output() change: EventEmitter<Filter> = new EventEmitter<Filter>();

  protected RarityEnum = CardRarity;

  private myRarityFilter: RarityFilter = new RarityFilter();

  protected get rarities(): CardRarity[] {
    return this.myRarityFilter.rarities;
  }

  protected set rarities(value: CardRarity[]) {
    this.myRarityFilter.rarities = value;
    this.change.emit(this.myRarityFilter);
  }
}
