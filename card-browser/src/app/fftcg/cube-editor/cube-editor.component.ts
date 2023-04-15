import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Observable, map, BehaviorSubject, combineLatest } from 'rxjs';

import { CardsService } from '../cards/cards.service';
import { Cube } from '../cubes/cube';
import { CubeCard } from '../cubes/cube-card';
import { Card } from '../cards/card';
import { Predicates } from 'src/app/shared/predicates';
import { Filter } from '../card-filter/filter';

@Component({
  selector: 'app-cube-editor',
  templateUrl: './cube-editor.component.html',
  styleUrls: ['./cube-editor.component.scss']
})
export class CubeEditorComponent implements OnInit, OnChanges {
  @Input() cube: Cube | undefined;

  protected cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  protected categoryOptions$: Observable<string[]> = CardsService.Categories(this.cards$);
  protected jobOptions$: Observable<string[]> = CardsService.Jobs(this.cards$);
  protected setOptions$: Observable<string[]> = CardsService.Sets(this.cards$);
  protected tagOptions$: Observable<string[]> = CardsService.Tags(this.cards$);
  protected filters$: BehaviorSubject<Filter[]> = new BehaviorSubject<Filter[]>([]);
  protected filteredCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  constructor(
    private cardsService: CardsService,
  )
  {}

  protected get cubeName(): string {
    return this.cube?.name ?? '';
  }

  protected set cubeName(value: string) {
    if (this.cube) this.cube.name = value;
  }

  protected onFiltersChanged(filters: Filter[]): void
  {
    this.filters$.next(filters);
  }

  ngOnInit(): void {
    combineLatest([this.cards$, this.filters$]).pipe(
      map(([cards, filters]: [Card[], Filter[]]) => {
        return cards.filter(card => {
          return filters.every(filter => filter.satisfies(card));
        })
      })
    ).subscribe(this.filteredCards$);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cube']) {
      this.cardsService.setIDToCard$.pipe(
        map(setIDToCard => {
          if (!this.cube) return [];

          return this.cube?.cards
          .map((cubeCard: CubeCard) => setIDToCard.get(cubeCard.setID))
          .filter(Predicates.Defined);
        }),
      ).subscribe(this.cards$);
    }
  }
}
