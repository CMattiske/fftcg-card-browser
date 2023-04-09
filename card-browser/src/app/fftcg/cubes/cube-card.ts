export class CubeCard {
    private mySetID!: string;
    private myRank!: number;

    constructor(setID: string, rank: number) {
        this.mySetID = setID;
        this.myRank = rank;
    }

    get setID(): string {
        return this.mySetID;
    }

    get rank(): number {
        return this.myRank;
    }
}