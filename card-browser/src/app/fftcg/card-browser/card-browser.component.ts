import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { Filter } from '../card-filter/filter';
import { Card } from '../cards/card';
import { CardsService } from '../cards/cards.service';

@Component({
  selector: 'app-card-browser',
  templateUrl: './card-browser.component.html',
  styleUrls: ['./card-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBrowserComponent implements OnInit {

  protected filters$: BehaviorSubject<Filter[]> = new BehaviorSubject<Filter[]>([]);
  protected filteredCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void
  {
    combineLatest([this.cardsService.allCards$, this.filters$]).pipe(
      map(([cards, filters]: [Card[], Filter[]]) => {
        return cards.filter(card => {
          return filters.every(filter => filter.satisfies(card));
        })
      })
    ).subscribe(this.filteredCards$);
  }

  protected onFiltersChanged(filters: Filter[]): void
  {
    this.filters$.next(filters);
  }
}
