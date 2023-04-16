import { Card } from "../cards/card";
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

    removeCard(card: Card): boolean {
        const index = this.myCards.findIndex(cubeCard => cubeCard.setID === card.setID);
        if (index == null) return false;

        this.myCards.splice(index, 1);
        return true;
    }
}