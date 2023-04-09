import { Component, Input } from '@angular/core';

import { Observable, map } from 'rxjs';

import { CardsService } from '../cards/cards.service';
import { Cube } from '../cubes/cube';
import { CubeCard } from '../cubes/cube-card';
import { Card } from '../cards/card';

@Component({
  selector: 'app-cube-editor',
  templateUrl: './cube-editor.component.html',
  styleUrls: ['./cube-editor.component.scss']
})
export class CubeEditorComponent {
  @Input() cube: Cube | undefined;

  constructor(
    private cardsService: CardsService,
  )
  {}

  protected card$(cubeCard: CubeCard): Observable<Card | undefined> {
    return this.cardsService.setIDToCard$.pipe(
      map(setIDToCard => setIDToCard.get(cubeCard.setID)),
    );
  }
}
