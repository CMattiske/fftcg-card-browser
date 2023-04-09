import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';

import { Filter } from '../card-filter/filter';
import { Card } from '../cards/card';
import { CardsService } from '../cards/cards.service';
import { CubesService } from '../cubes/cubes.service';

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

  protected listNameOptions$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(["All"]);
  private list$: BehaviorSubject<Set<string> | undefined> = new BehaviorSubject<Set<string> | undefined>(undefined);
  private myListName: string = "All";

  private nameToList: Map<string, Set<string> | undefined> = new Map<string, Set<string> | undefined>([["All", undefined]]);

  constructor(private cardsService: CardsService, private cubesService: CubesService) {}

  protected get listName(): string {
    return this.myListName;
  }

  protected set listName(value: string) {
    this.myListName = value;
    this.list$.next(this.nameToList.get(this.myListName))
  }

  ngOnInit(): void
  {
    this.cubesService.allCubes$.pipe(
      tap(cubes => cubes.forEach(cube => this.nameToList.set(cube.name, new Set<string>(cube.cards.map(card => card.setID))))),
      map(cubes => ["All"].concat(cubes.map(cube => cube.name)))
    ).subscribe(this.listNameOptions$)

    combineLatest([this.cardsService.allCards$, this.list$]).pipe(
      map(([allCards, list]: [Card[], Set<string> | undefined]): Card[] => {
        return list ? allCards.filter(card => list?.has(card.setID)) : allCards;
      })
    ).subscribe(this.cards$);

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
