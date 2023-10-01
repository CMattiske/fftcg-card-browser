import { Pipe, PipeTransform } from '@angular/core';
import { CardRarity } from '../cards/card-rarity';

@Pipe({
  name: 'displayRarity'
})
export class DisplayRarityPipe implements PipeTransform {

  transform(value: CardRarity | undefined): string {
    switch (value) {
        case CardRarity.COMMON: return "C";
        case CardRarity.RARE: return "R";
        case CardRarity.HERO: return "H";
        case CardRarity.LEGEND: return "L";
        case CardRarity.STARTER: return "S";
        case CardRarity.PROMO: return "PR";
        case CardRarity.BOSS: return "B";
    }
    
    return '';
  }

}
