export class CardSet
{
    private myName!: string;
    private myAbbreviation!: string;
    private myOrder!: number;
    private myCount!: number;
    private myTitle!: string | undefined;

    constructor(name: string, abbreviation: string, order: number, count: number, title: string | undefined = undefined)
    {
        this.myAbbreviation = abbreviation;
        this.myName = name;
        this.myCount = count;
        this.myTitle = title;
    }

    get name(): string {
        return this.myName;
    }

    get abbreviation(): string {
        return this.myAbbreviation;
    }

    get order(): number {
        return this.myOrder;
    }
}

export class CardSets
{
    static UnknownSet: CardSet = new CardSet("Unknown", "?", 0, 0);

    static CoreSets: CardSet[] = [
        new CardSet("Opus I", "1", 1, 216),
        new CardSet("Opus II", "2", 2, 148),
        new CardSet("Opus III", "3", 3, 154),
        new CardSet("Opus IV", "4", 4, 148),
        new CardSet("Opus V", "5", 5, 166),
        new CardSet("Opus VI", "6", 6, 130),
        new CardSet("Opus VII", "7", 7, 138),
        new CardSet("Opus VIII", "8", 8, 148),
        new CardSet("Opus IX", "9", 9, 124),
        new CardSet("Opus X", "10", 10, 140),
        new CardSet("Opus XI", "11", 11, 140),
        new CardSet("Opus XII", "12", 12, 128),
        new CardSet("Opus XIII", "13", 13, 138),
        new CardSet("Opus XIV", "14", 14, 130),
        new CardSet("Opus XV", "15", 15, 140, "Crystal Dominion"),
        new CardSet("Opus XVI", "16", 16, 140, "Emissaries of Light"),
        new CardSet("Opus XVII", "17", 17, 140, "Rebellion's Call"),
        new CardSet("Opus XVIII", "18", 18, 140, "Resurgence of Power"),
        new CardSet("Opus XIX", "19", 19, 138, "From Nightmares"),
    ];

    static OtherSets: CardSet[] = [
        new CardSet("Promo", "PR", 100, 7),
        new CardSet("Boss", "B", 200, 54),
    ];

    static NameToSet: Map<string, CardSet> = CardSets.CoreSets.concat(CardSets.OtherSets).reduce(
        (map: Map<string, CardSet>, set: CardSet) => map.set(set.name, set),
        new Map(),
    )

    static FromName(name: string): CardSet
    {
        return CardSets.NameToSet.get(name) ?? CardSets.UnknownSet;
    }
}