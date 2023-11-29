import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DeckList } from './deck-list';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { DeckListsService } from './deck-lists.service';
import { DeckListCard } from './deck-list-card';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecksComponent {

  pendingDeckLists: DeckList[] = [];

  private myDeckList: DeckList | undefined;

  private newDeckList$: BehaviorSubject<DeckList | undefined> = new BehaviorSubject<DeckList | undefined>(undefined);
  private pendingDeckLists$: BehaviorSubject<DeckList[]> = new BehaviorSubject<DeckList[]>([]);

  protected deckLists$: Observable<DeckList[]> = combineLatest([this.deckListsService.allDeckLists$, this.pendingDeckLists$]).pipe(
    map(([existingDeckLists, pendingDeckLists]: [DeckList[], DeckList[]]): DeckList[] => existingDeckLists.concat(pendingDeckLists)),
  );

  constructor(private deckListsService: DeckListsService) {}

  protected get deckList(): DeckList | undefined {
    return this.myDeckList;
  }

  protected set deckList(value: DeckList | undefined) {
    this.myDeckList = value;
  }

  protected onClickCreateNew(): void {
    this.newDeckList$.next(new DeckList(undefined, 'Untitled DeckList', []));
  }

  protected onClickClone(): void {
    if (this.myDeckList) {
      this.newDeckList$.next(new DeckList(
        undefined,
        `Copy of ${this.myDeckList.name}`,
        this.myDeckList.cards.map(deckListCard => new DeckListCard(deckListCard.setID, deckListCard.count))));
    }
  }

  ngOnInit(): void {
    this.newDeckList$.subscribe((deckList: DeckList | undefined) => {
      if (deckList) {
        this.pendingDeckLists.push(deckList);
        this.pendingDeckLists$.next(this.pendingDeckLists);
        this.myDeckList = deckList;
      }
    });
  }
}
