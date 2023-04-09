import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() cardClick: EventEmitter<Card> = new EventEmitter<Card>();

  constructor(private imagesService: ImagesService)
  {}

  protected cardImage(card: Card): string {
    return this.imagesService.cardImage(card);
  }

  protected onClick(card: Card): void {
    this.cardClick.emit(card);
  }
}
