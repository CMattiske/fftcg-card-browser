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

    get name(): string {
        return this.myName;
    }

    set name(name: string) {
        this.myName = name;
    }

    get cards(): CubeCard[] {
        return this.myCards;
    }
}