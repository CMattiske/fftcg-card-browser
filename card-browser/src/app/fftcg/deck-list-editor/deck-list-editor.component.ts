import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { Observable, map, BehaviorSubject, combineLatest, catchError } from 'rxjs';

import { CardsService } from '../cards/cards.service';
import { Card } from '../cards/card';
import { Predicates } from 'src/app/shared/predicates';
import { Filter } from '../card-filter/filter';
import { BackendService } from '../backend/backend.service';
import { LoggingService } from 'src/app/logging.service';
import { CardSorting } from '../cards/card-sorting';
import { DeckList } from '../deck-lists/deck-list';
import { DeckListCard } from '../deck-lists/deck-list-card';
import { DeckListsService } from '../deck-lists/deck-lists.service';

type SortBy = 'id' | 'element' | 'type';

class DeckCard
{
  private myCard!: Card;
  private myCount!: number;

  constructor(card: Card, count: number)
  {
    this.myCard = card;
    this.myCount = count;
  }

  get card(): Card
  {
    return this.myCard;
  }

  get count(): number
  {
    return this.myCount;
  }
}

@Component({
  selector: 'app-deck-list-editor',
  templateUrl: './deck-list-editor.component.html',
  styleUrls: ['./deck-list-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckListEditorComponent implements OnInit, OnChanges {
  @Input() deckList: DeckList | undefined;

  protected deckCards$ = new BehaviorSubject<DeckCard[]>([]);

  protected categoryOptions$: Observable<string[]> = CardsService.Categories(this.cardsService.allCards$);
  protected jobOptions$: Observable<string[]> = CardsService.Jobs(this.cardsService.allCards$);
  protected setOptions$: Observable<string[]> = CardsService.Sets(this.cardsService.allCards$);
  protected tagOptions$: Observable<string[]> = CardsService.Tags(this.cardsService.allCards$);
  protected filters$: BehaviorSubject<Filter[]> = new BehaviorSubject<Filter[]>([]);
  protected sortedDeckCards$ = new BehaviorSubject<DeckCard[]>([]);

  protected filteredAllCards$: BehaviorSubject<Card[]> = new BehaviorSubject<Card[]>([]);
  protected fadedCards$: BehaviorSubject<Set<Card>> = new BehaviorSubject<Set<Card>>(new Set<Card>());

  private deckList$!: BehaviorSubject<DeckList | undefined>;
  private sortBy$: BehaviorSubject<SortBy> = new BehaviorSubject<SortBy>('id');

  private mySortBy: SortBy = 'id';

  constructor(
    private loggingService: LoggingService,
    private backendService: BackendService,
    private cardsService: CardsService,
  )
  {}

  protected get name(): string {
    return this.deckList?.name ?? '';
  }

  protected set name(value: string) {
    if (this.deckList) this.deckList.name = value;
  }

  protected get sortBy(): SortBy {
    return this.mySortBy;
  }

  protected set sortBy(value: SortBy) {
    this.mySortBy = value;
    this.sortBy$.next(this.mySortBy);
  }

  protected onClickSave(): void {
    if (this.deckList) {
      // this.deckList.sort();
      if (this.deckList.id == null) {
        this.loggingService.log(`Saving new deckList: ${this.deckList.name}`);
        this.backendService.createDeckList(DeckListsService.IDeckList(this.deckList)).pipe(
          catchError(err => {
            this.loggingService.error(err.message);
            throw(err);
          }),
        ).subscribe(() => this.loggingService.log('DeckList saved!'));
      }
      else {
        this.loggingService.log(`Saving existing deckList: ${this.deckList.name}`);
        this.backendService.saveDeckList(DeckListsService.IDeckList(this.deckList)).pipe(
          catchError(err => {
            this.loggingService.error(err.message);
            throw(err);
          }),
        ).subscribe(() => this.loggingService.log('DeckList saved!'));
      }
    }
  }

  protected onFiltersChanged(filters: Filter[]): void
  {
    this.filters$.next(filters);
  }

  protected onAllCardClick(card: Card): void {
    if (card.id == null) return;

    this.deckList?.addOne(card);

    this.deckList$.next(this.deckList);
  }

  protected onDeckListCardClick(card: Card): void {
    if (card.id == null) return;

    this.deckList?.removeOne(card.setID);

    this.deckList$.next(this.deckList);
  }

  ngOnInit(): void {
    this.deckList$ = new BehaviorSubject<DeckList | undefined>(this.deckList);
    combineLatest([this.deckList$, this.cardsService.setIDToCard$]).pipe(
      map(([deckList, setIDToCard]: [DeckList | undefined, Map<string, Card>]) => {
        if (!deckList) return [];

          return deckList.cards
          .map((deckListCard: DeckListCard): [Card, number] | undefined => {
            const card = setIDToCard.get(deckListCard.setID);
            if (!card) return undefined;
            
            return [card, deckListCard.count];
          })
          .filter(Predicates.Defined)
          .map(([card, count]) => new DeckCard(card, count));
      }),
    ).subscribe(this.deckCards$);

    combineLatest([this.deckCards$, this.sortBy$]).pipe(
      map(([deckCards, sortBy]: [DeckCard[], SortBy]) => {
        const sortedDeckCards = [...deckCards];
        switch (sortBy) {
          case 'id':
            sortedDeckCards.sort((lhs, rhs) => CardSorting.BySetID(lhs.card, rhs.card));
            break;
          case 'element':
            sortedDeckCards.sort((lhs, rhs) => CardSorting.CompoundSort(
              lhs.card,
              rhs.card,
              CardSorting.ByElements,
              CardSorting.ByType,
              CardSorting.ByCost));
            break;
          case 'type':
            sortedDeckCards.sort((lhs, rhs) => CardSorting.CompoundSort(
              lhs.card,
              rhs.card,
              CardSorting.ByType,
              CardSorting.ByElements,
              CardSorting.ByCost));
            break;
        }

        return sortedDeckCards;
      })
    ).subscribe(this.sortedDeckCards$);

    combineLatest([this.cardsService.allCards$, this.filters$]).pipe(
      map(([cards, filters]: [Card[], Filter[]]) => {
        return cards.filter(card => {
          return filters.every(filter => filter.satisfies(card));
        })
      })
    ).subscribe(this.filteredAllCards$);

    this.deckCards$.pipe(
      map((deckCards: DeckCard[]): Set<Card> => {
        return new Set<Card>(deckCards
          .filter(deckCard => deckCard.count === DeckList.MAX_COUNT)
          .map(deckCard => deckCard.card));
      }),
    ).subscribe(this.fadedCards$);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deckList'] && this.deckList$) {
      this.deckList$.next(changes['deckList'].currentValue as DeckList | undefined);
    }
  }
}
