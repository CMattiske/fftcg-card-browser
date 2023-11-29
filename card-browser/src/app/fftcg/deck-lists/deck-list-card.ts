export class DeckListCard
{
    private mySetID!: string;
    private myCount!: number;

    constructor(setID: string, count: number) {
        this.mySetID = setID;
        this.myCount = count;
    }

    get setID(): string {
        return this.mySetID;
    }

    get count(): number {
        return this.myCount;
    }

    set count(count: number) {
        this.myCount = count;
    }
}