import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

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

  protected cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  protected categoryOptions$: Observable<string[]> = CardsService.Categories(this.cards$);
  protected jobOptions$: Observable<string[]> = CardsService.Jobs(this.cards$);
  protected setOptions$: Observable<string[]> = CardsService.Sets(this.cards$);
  protected tagOptions$: Observable<string[]> = CardsService.Tags(this.cards$);

  protected filters$: BehaviorSubject<Filter[]> = new BehaviorSubject<Filter[]>([]);
  protected filteredCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void
  {
    this.cardsService.allCards$.subscribe(this.cards$);

    combineLatest([this.cards$, this.filters$]).pipe(
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
