import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/fftcg/backend/backend.service';

import { BehaviorSubject, Observable, map, tap, shareReplay } from 'rxjs';

import { Card } from './card';
import { ECardType, EElement, ERarity, ICard } from '../backend/resources/card';
import { CardElement } from './card-element';
import { CardSets } from './card-set';
import { CardRarity } from './card-rarity';
import { LoggingService } from 'src/app/logging.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  allCards$: Observable<Card[]> = this.backendService.getAllCards().pipe(
    map((rawCards: ICard[]): Card[] => {
      return rawCards.map(CardsService.Card);
    }),
    shareReplay(1),
  );

  allCategories$: Observable<string[]> = CardsService.Categories(this.allCards$).pipe(
    tap(categories => this.loggingService.log(`${categories.length} categories found`)),
    shareReplay(1),
  );
  allJobs$: Observable<string[]> = CardsService.Jobs(this.allCards$).pipe(
    tap(jobs => this.loggingService.log(`${jobs.length} jobs found`)),
    shareReplay(1),
  );
  allSetNames$: Observable<string[]> = CardsService.Sets(this.allCards$).pipe(
    tap(setNames => this.loggingService.log(`${setNames.length} sets found`)),
    shareReplay(1),
  );
  allTags$: Observable<string[]> = CardsService.Tags(this.allCards$).pipe(
    tap(tags => this.loggingService.log(`${tags.length} categories found`)),
    shareReplay(1),
  );

  constructor(private loggingService: LoggingService, private backendService: BackendService) { }

  static Categories(cards$: Observable<Card[]>): Observable<string[]> {
    return cards$.pipe(
      map((cards: Card[]) => {
        const set: Set<string> = new Set<string>();
        cards.forEach(card => card.categories.forEach(category => set.add(category)));
        return [...set];
      }),
    );
  }

  static Jobs(cards$: Observable<Card[]>): Observable<string[]> {
    return cards$.pipe(
      map((cards: Card[]) => {
        const set: Set<string> = new Set<string>();
        cards.forEach(card => (card.jobs ?? []).forEach(job => set.add(job)));
        return [...set];
      }),
    );
  }

  static Sets(cards$: Observable<Card[]>): Observable<string[]> {
    return cards$.pipe(
      map((cards: Card[]) => {
        const set: Set<string> = new Set<string>();
        cards.forEach(card => set.add(card.set.name));
        return [...set];
      }),
    );
  }

  static Tags(cards$: Observable<Card[]>): Observable<string[]> {
    return cards$.pipe(
      map((cards: Card[]) => {
        const set: Set<string> = new Set<string>();
        cards.forEach(card => card.tags.forEach(tag => set.add(tag)));
        return [...set];
      }),
    );
  }

  private static Card(rawCard: ICard): Card
  {
    switch (rawCard.type) {
      case ECardType.FORWARD:
        return Card.Forward(
          rawCard.name,
          rawCard.elements.map(CardsService.Element),
          rawCard.cost,
          rawCard.categories,
          rawCard.text,
          CardSets.FromName(rawCard.set),
          rawCard.index,
          CardsService.Rarity(rawCard.rarity),
          rawCard.tags,
          rawCard.exburst,
          rawCard.abilities,
          rawCard.jobs,
          rawCard.power,
          rawCard.multicard,
        );
      case ECardType.BACKUP:
        return Card.Backup(
          rawCard.name,
          rawCard.elements.map(CardsService.Element),
          rawCard.cost,
          rawCard.categories,
          rawCard.text,
          CardSets.FromName(rawCard.set),
          rawCard.index,
          CardsService.Rarity(rawCard.rarity),
          rawCard.tags,
          rawCard.exburst,
          rawCard.abilities,
          rawCard.jobs,
          rawCard.power,
          rawCard.multicard,
        );
      case ECardType.SUMMON:
        return Card.Summon(
          rawCard.name,
          rawCard.elements.map(CardsService.Element),
          rawCard.cost,
          rawCard.categories,
          rawCard.text,
          CardSets.FromName(rawCard.set),
          rawCard.index,
          CardsService.Rarity(rawCard.rarity),
          rawCard.tags,
          rawCard.exburst,
          rawCard.abilities,
        );
      case ECardType.MONSTER:
        return Card.Monster(
          rawCard.name,
          rawCard.elements.map(CardsService.Element),
          rawCard.cost,
          rawCard.categories,
          rawCard.text,
          CardSets.FromName(rawCard.set),
          rawCard.index,
          CardsService.Rarity(rawCard.rarity),
          rawCard.tags,
          rawCard.exburst,
          rawCard.abilities,
          rawCard.jobs,
          rawCard.power,
          rawCard.multicard,
        );
    }
  }

  static Element(element: EElement): CardElement
  {
    switch (element) {
      case EElement.FIRE: return CardElement.FIRE;
      case EElement.ICE: return CardElement.ICE;
      case EElement.WIND: return CardElement.WIND;
      case EElement.EARTH: return CardElement.EARTH;
      case EElement.LIGHTNING: return CardElement.LIGHTNING;
      case EElement.WATER: return CardElement.WATER;
      case EElement.LIGHT: return CardElement.LIGHT;
      case EElement.DARK: return CardElement.DARK;
    }
  }

  static Rarity(rarity: ERarity): CardRarity
  {
    switch (rarity)
    {
      case ERarity.COMMON: return CardRarity.COMMON;
      case ERarity.RARE: return CardRarity.RARE;
      case ERarity.HERO: return CardRarity.HERO;
      case ERarity.LEGEND: return CardRarity.LEGEND;
      case ERarity.STARTER: return CardRarity.STARTER;
      case ERarity.PROMO: return CardRarity.PROMO;
      case ERarity.BOSS: return CardRarity.BOSS;
    }
  }
}
