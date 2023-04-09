import { CubeCard } from "./cube-card";

export class Cube {
    private myName!: string;
    private myCards!: CubeCard[];

    constructor(name: string, cards: CubeCard[]) {
        this.myName = name;
        this.myCards = cards;
    }

    get name(): string {
        return this.myName;
    }

    get cards(): CubeCard[] {
        return this.myCards;
    }
}