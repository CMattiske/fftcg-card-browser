import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Observable, map, BehaviorSubject, combineLatest, catchError } from 'rxjs';

import { CardsService } from '../cards/cards.service';
import { Cube } from '../cubes/cube';
import { CubeCard } from '../cubes/cube-card';
import { Card } from '../cards/card';
import { Predicates } from 'src/app/shared/predicates';
import { Filter } from '../card-filter/filter';
import { BackendService } from '../backend/backend.service';
import { CubesService } from '../cubes/cubes.service';
import { LoggingService } from 'src/app/logging.service';
import { CardElement } from '../cards/card-element';
import { CardType } from '../cards/card-type';
import { ElementBreakdown, CubeBreakdown } from '../cube-breakdown/cube-breakdown.component';
import { CardSorting } from '../cards/card-sorting';

const emptyElementBreakdown = {
  totalCount: 0,
  typeToCount: new Map<CardType, number>([
    [CardType.FORWARD, 0],
    [CardType.BACKUP, 0],
    [CardType.SUMMON, 0],
    [CardType.MONSTER, 0],
  ])
} as ElementBreakdown;

const emptyCubeBreakdown = {
  totalCount: 0,
  elementToBreakdown: new Map<CardElement, ElementBreakdown>([
    [CardElement.FIRE, {...emptyElementBreakdown} as ElementBreakdown],
    [CardElement.ICE, {...emptyElementBreakdown} as ElementBreakdown],
    [CardElement.WIND, {...emptyElementBreakdown} as ElementBreakdown],
    [CardElement.EARTH, {...emptyElementBreakdown} as ElementBreakdown],
    [CardElement.LIGHTNING, {...emptyElementBreakdown} as ElementBreakdown],
    [CardElement.WATER, {...emptyElementBreakdown} as ElementBreakdown],
    [CardElement.LIGHT, {...emptyElementBreakdown} as ElementBreakdown],
    [CardElement.DARK, {...emptyElementBreakdown} as ElementBreakdown],
  ]),
}

type SortBy = 'id' | 'element' | 'type';

@Component({
  selector: 'app-cube-editor',
  templateUrl: './cube-editor.component.html',
  styleUrls: ['./cube-editor.component.scss']
})
export class CubeEditorComponent implements OnInit, OnChanges {
  @Input() cube: Cube | undefined;

  protected cards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  protected breakdown$: BehaviorSubject<CubeBreakdown> = new BehaviorSubject<CubeBreakdown>(emptyCubeBreakdown);

  protected categoryOptions$: Observable<string[]> = CardsService.Categories(this.cardsService.allCards$);
  protected jobOptions$: Observable<string[]> = CardsService.Jobs(this.cardsService.allCards$);
  protected setOptions$: Observable<string[]> = CardsService.Sets(this.cardsService.allCards$);
  protected tagOptions$: Observable<string[]> = CardsService.Tags(this.cardsService.allCards$);
  protected filters$: BehaviorSubject<Filter[]> = new BehaviorSubject<Filter[]>([]);
  protected filteredCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);

  protected filteredAllCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  protected fadedCards$: BehaviorSubject<Set<Card>> = new BehaviorSubject<Set<Card>>(new Set<Card>());

  private cube$!: BehaviorSubject<Cube | undefined>;
  private sortBy$: BehaviorSubject<SortBy> = new BehaviorSubject<SortBy>('id');

  private mySortBy: SortBy = 'id';

  constructor(
    private loggingService: LoggingService,
    private backendService: BackendService,
    private cardsService: CardsService,
  )
  {}

  protected get cubeName(): string {
    return this.cube?.name ?? '';
  }

  protected set cubeName(value: string) {
    if (this.cube) this.cube.name = value;
  }

  protected get sortBy(): SortBy {
    return this.mySortBy;
  }

  protected set sortBy(value: SortBy) {
    this.mySortBy = value;
    this.sortBy$.next(this.mySortBy);
  }

  protected onClickSave(): void {
    if (this.cube) {
      this.cube.sort();
      if (this.cube.id == null) {
        this.loggingService.log(`Saving new cube: ${this.cube.name}`);
        this.backendService.createCube(CubesService.ICube(this.cube)).pipe(
          catchError(err => {
            this.loggingService.error(err.message);
            throw(err);
          }),
        ).subscribe(() => this.loggingService.log('Cube saved!'));
      }
      else {
        this.loggingService.log(`Saving existing cube: ${this.cube.name}`);
        this.backendService.saveCube(CubesService.ICube(this.cube)).pipe(
          catchError(err => {
            this.loggingService.error(err.message);
            throw(err);
          }),
        ).subscribe(() => this.loggingService.log('Cube saved!'));
      }
    }
  }

  protected onFiltersChanged(filters: Filter[]): void
  {
    this.filters$.next(filters);
  }

  protected onAllCardClick(card: Card): void {
    this.cube?.cards.push(new CubeCard(card.setID, 8));
    this.cube$.next(this.cube);
  }

  protected onCubeCardClick(card: Card): void {
    this.cube?.removeCard(card);
    this.cube$.next(this.cube);
  }

  ngOnInit(): void {
    this.cube$ = new BehaviorSubject<Cube | undefined>(this.cube);
    combineLatest([this.cube$, this.cardsService.setIDToCard$]).pipe(
      map(([cube, setIDToCard]: [Cube | undefined, Map<string, Card>]) => {
        if (!cube) return [];

          return cube.cards
          .map((cubeCard: CubeCard) => setIDToCard.get(cubeCard.setID))
          .filter(Predicates.Defined);
      }),
    ).subscribe(this.cards$);

    combineLatest([this.cards$, this.filters$, this.sortBy$]).pipe(
      map(([cards, filters, sortBy]: [Card[], Filter[], SortBy]) => {
        const filteredCards = cards.filter(card => {
          return filters.every(filter => filter.satisfies(card));
        });

        switch (sortBy) {
          case 'id':
            filteredCards.sort(CardSorting.BySetID);
            break;
          case 'element':
            filteredCards.sort((lhs, rhs) => CardSorting.CompoundSort(
              lhs,
              rhs,
              CardSorting.ByElements,
              CardSorting.ByType,
              CardSorting.ByCost));
            break;
          case 'type':
            filteredCards.sort((lhs, rhs) => CardSorting.CompoundSort(
              lhs,
              rhs,
              CardSorting.ByType,
              CardSorting.ByElements,
              CardSorting.ByCost));
            break;
        }

        return filteredCards;
      })
    ).subscribe(this.filteredCards$);

    combineLatest([this.cardsService.allCards$, this.filters$]).pipe(
      map(([cards, filters]: [Card[], Filter[]]) => {
        return cards.filter(card => {
          return filters.every(filter => filter.satisfies(card));
        })
      })
    ).subscribe(this.filteredAllCards$);

    this.cards$.pipe(
      map((cards: Card[]): Set<Card> => new Set<Card>(cards)),
    ).subscribe(this.fadedCards$);

    this.cards$.pipe(
      map((cards: Card[]): CubeBreakdown => {
        // Initialise breakdown.
        const breakdown = {
          totalCount: 0,
          elementToBreakdown: new Map<CardElement, ElementBreakdown>(),
        } as CubeBreakdown;
        for (const element of Object.values(CardElement)) {
          const elementBreakdown = {
            totalCount: 0,
            typeToCount: new Map<CardType, number>(),
          } as ElementBreakdown;
          for (const cardType of Object.values(CardType)) {
            elementBreakdown.typeToCount.set(cardType, 0)
          }
          breakdown.elementToBreakdown.set(element, elementBreakdown);
        }

        // Now do the counts.
        cards.forEach((card: Card) => {
          ++breakdown.totalCount;
          card.elements.forEach((element: CardElement) => {
            const elementBreakdown = breakdown.elementToBreakdown.get(element);
            if (!elementBreakdown) {
              this.loggingService.error(`Unknown element ${element}`);
              return;
            }

            ++elementBreakdown.totalCount;
            const typeCount = elementBreakdown.typeToCount.get(card.type);
            if (typeCount == null) {
              this.loggingService.error(`Unknown card type ${card.type}`);
              return;
            }

            elementBreakdown.typeToCount.set(card.type, typeCount + 1);
          })
        });

        return breakdown;
      }),
    ).subscribe(this.breakdown$);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cube'] && this.cube$) {
      this.cube$.next(changes['cube'].currentValue as Cube | undefined);
    }
  }
}
