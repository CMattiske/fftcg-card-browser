import { Card } from "../cards/card";
import { CardSets } from "../cards/card-set";
import { CubeCard } from "./cube-card";

export class Cube {
    private myName!: string;
    private myCards!: CubeCard[];

    private myID: number | undefined;

    constructor(id: number | undefined, name: string, cards: CubeCard[]) {
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

    get cards(): CubeCard[] {
        return this.myCards;
    }

    sort(): void {
        this.myCards.sort((lhs: CubeCard, rhs: CubeCard) => {
            const lhsSplit = lhs.setID.split('-');
            const rhsSplit = rhs.setID.split('-');

            if (lhsSplit[0] === rhsSplit[0]) {
                return +lhsSplit[1] - +rhsSplit[1];
            }

            const lhsSet = CardSets.AbbreviationToSet.get(lhsSplit[0]);
            const rhsSet = CardSets.AbbreviationToSet.get(rhsSplit[0]);

            if (!lhsSet) {
                console.log(`Set not found: ${lhsSplit[0]}`);
            }
            if (!rhsSet) {
                console.log(`Set not found: ${rhsSplit[0]}`);
            }
            if (!lhsSet && !rhsSet) return 0;
            if (!lhsSet) return -1;
            if (!rhsSet) return 1;

            return lhsSet.order - rhsSet.order;
        });
    }

    removeCard(card: Card): boolean {
        const index = this.myCards.findIndex(cubeCard => cubeCard.setID === card.setID);
        if (index == null) return false;

        this.myCards.splice(index, 1);
        return true;
    }
}