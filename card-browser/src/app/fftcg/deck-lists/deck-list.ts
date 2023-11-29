import { Card } from "../cards/card";
import { CardSorting } from "../cards/card-sorting";
import { DeckListCard } from "./deck-list-card";

export class DeckList
{
    static MAX_COUNT: number = 3;

    private myName!: string;
    private myCards!: DeckListCard[];

    private myID: number | undefined;

    constructor(id: number | undefined, name: string, cards: DeckListCard[]) {
        this.myID = id;
        this.myName = name;
        this.myCards = cards;
    }

    get id(): number | undefined {
        return this.myID;
    }

    get name(): string {
        return this.myName;
    }

    set name(name: string) {
        this.myName = name;
    }

    get cards(): DeckListCard[] {
        return this.myCards;
    }

    addOne(card: Card): void
    {
        const deckListCard = this.myCards.find(deckListCard => deckListCard.setID === card.setID);
        if (deckListCard)
        {
            deckListCard.count++;
        }
        else
        {
            this.myCards.push(new DeckListCard(card.setID, 1));
        }
    }

    removeOne(setID: string): boolean
    {
        const deckListCard = this.myCards.find(deckListCard => deckListCard.setID === setID);
        if (!deckListCard) return false;

        if (deckListCard.count > 0)
        {
            deckListCard.count--;
        }

        if (deckListCard.count === 0)
        {
            this.myCards = this.myCards.filter(card => card !== deckListCard);
        }

        return true;
    }
}