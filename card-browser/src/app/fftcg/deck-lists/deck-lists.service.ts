import { Injectable } from '@angular/core';
import { DeckList } from './deck-list';
import { IDeckList } from '../backend/resources/deck-list';
import { LoggingService } from 'src/app/logging.service';
import { BackendService } from '../backend/backend.service';
import { Observable, map, shareReplay } from 'rxjs';
import { DeckListCard } from './deck-list-card';

@Injectable({
  providedIn: 'root'
})
export class DeckListsService {

  allDeckLists$: Observable<DeckList[]> = this.backendService.getAllDeckLists().pipe(
    map((rawDeckLists: IDeckList[]): DeckList[] => {
      return rawDeckLists.map(DeckListsService.DeckList);
    }),
    shareReplay(1),
  );

  constructor(
    private loggingService: LoggingService,
    private backendService: BackendService,
  ) { }

  private static DeckList(rawDeckList: IDeckList): DeckList {
    return new DeckList(rawDeckList.id, rawDeckList.name, rawDeckList.cards.map(card => new DeckListCard(card.setID, card.count)));
  }

  public static IDeckList(deckList: DeckList): IDeckList {
    return {
      id: deckList.id,
      name: deckList.name,
      cards: deckList.cards.map(deckListCard => {
        return {
          setID: deckListCard.setID,
          count: deckListCard.count,
        };
      }),
    };
  }
}
