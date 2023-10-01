import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Card } from '../cards/card';
import { ImagesService } from '../images.service';
import { Observable, map, combineLatest, switchMap, of } from 'rxjs';
import { CardsService } from '../cards/cards.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CardElement } from '../cards/card-element';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDetailsComponent implements OnInit {
  protected card$!: Observable<Card | undefined>;

  private setID$!: Observable<string | undefined>;

  constructor(
    private route: ActivatedRoute,
    private imagesService: ImagesService,
    private cardsService: CardsService) {}

  ngOnInit(): void
  {
    this.setID$ = this.route.paramMap.pipe(
      map((paramMap: ParamMap): string | undefined => {
        return paramMap.get('id') ?? undefined;
      }),
    )
    
    this.card$ = combineLatest([
      this.setID$,
      this.cardsService.setIDToCard$,
    ]).pipe(
      map(([setID, setIDToCard]): Card | undefined => {
        return setID == null ? undefined : setIDToCard.get(setID);
      }),
    );
  }

  protected cardImage(card: Card | undefined | null): string
  {
    if (!card) return '';

    return this.imagesService.cardImage(card);
  }

  protected elementImage(element: CardElement): string
  {
    return this.imagesService.elementImage(element);
  }

  protected get nextCard$(): Observable<Card | undefined>
  {
    return this.card$.pipe(switchMap(card => card ? this.cardsService.nextCard$(card) : of(undefined)));
  }

  protected get prevCard$(): Observable<Card | undefined>
  {
    return this.card$.pipe(switchMap(card => card ? this.cardsService.prevCard$(card) : of(undefined)));
  }
}
