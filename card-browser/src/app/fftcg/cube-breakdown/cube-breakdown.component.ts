import { Component, Input } from '@angular/core';

import { CardElement } from '../cards/card-element';
import { CardType } from '../cards/card-type';

export interface ElementBreakdown {
  totalCount: number;
  typeToCount: Map<CardType, number>;
}

export interface CubeBreakdown {
  totalCount: number;
  elementToBreakdown: Map<CardElement, ElementBreakdown>;
}

@Component({
  selector: 'app-cube-breakdown',
  templateUrl: './cube-breakdown.component.html',
  styleUrls: ['./cube-breakdown.component.scss']
})
export class CubeBreakdownComponent {
  @Input() breakdown: CubeBreakdown | null = null;

  ElementEnum = CardElement;
  TypeEnum = CardType;
}
