import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BehaviorSubject, Observable, debounceTime, map } from 'rxjs';

import { Card } from '../cards/card';
import { ImagesService } from '../images.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-gallery',
  templateUrl: './card-gallery.component.html',
  styleUrls: ['./card-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGalleryComponent {
  @Input() cards: Card[] = [];
  @Input() fadedCards: Set<Card> = new Set<Card>();

  @Output() cardClick: EventEmitter<Card> = new EventEmitter<Card>();

  protected myWidthSliderValue: number = 215;

  private widthSliderValueSubject = new BehaviorSubject<number>(this.myWidthSliderValue);

  constructor(private imagesService: ImagesService)
  {}

  protected get widthSliderValue(): number {
    return this.myWidthSliderValue;
  }

  protected set widthSliderValue(value: number) {
    this.myWidthSliderValue = value;
    this.widthSliderValueSubject.next(this.myWidthSliderValue);
  }

  protected get cardWidthCSS$(): Observable<string> {
    return this.widthSliderValueSubject.pipe(
      map((value: number) => {
        return `${value}px`;
      }),
    )
  }

  protected cardImage(card: Card): string {
    return this.imagesService.cardImage(card);
  }

  protected isFaded(card: Card): boolean {
    return this.fadedCards.has(card);
  }

  protected onClick(card: Card): void {
    this.cardClick.emit(card);
  }
}
