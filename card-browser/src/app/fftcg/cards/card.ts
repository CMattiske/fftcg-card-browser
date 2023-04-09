import { Ability } from "./ability";
import { CardRarity } from "./card-rarity";
import { CardSet } from "./card-set";
import { CardType } from "./card-type";
import { CardElement } from "./card-element";

export class Card
{
    private myName!: string;
    private myType!: CardType;
    private myElements!: CardElement[];
    private myCost!: number;
    private myCategories!: string[];
    private myText!: string;

    private mySet!: CardSet;
    private mySetIndex!: number;
    private myRarity!: CardRarity;
    private myTags: string[] = [];

    private isEXBurst: boolean = false;
    private myAbilities: Ability[] = [];

    private myJobs: string[] | undefined;
    private myPower: number | undefined;
    private isMulticard: boolean | undefined;

    constructor(
        name: string,
        type: CardType,
        elements: CardElement[],
        cost: number,
        categories: string[],
        text: string,
        set: CardSet,
        setIndex: number,
        rarity: CardRarity,
        tags: string[],
        exBurst: boolean,
        abilities: Ability[],
        jobs: string[] | undefined,
        power: number | undefined,
        multicard: boolean | undefined,
    )
    {
        this.myName = name;
        this.myType = type;
        this.myElements = elements;
        this.myCost = cost;
        this.myCategories = categories;
        this.myText = text;
        this.mySet = set;
        this.mySetIndex = setIndex;
        this.myRarity = rarity;
        this.myTags = tags;
        this.isEXBurst = exBurst;
        this.myAbilities = abilities;
        this.myJobs = jobs;
        this.myPower = power;
        this.isMulticard = multicard;
    }
    
    static Forward(
        name: string,
        elements: CardElement[],
        cost: number,
        categories: string[],
        text: string,
        set: CardSet,
        setIndex: number,
        rarity: CardRarity,
        tags: string[],
        exBurst: boolean,
        abilities: Ability[],
        jobs: string[] | undefined,
        power: number | undefined,
        multicard: boolean | undefined,
    ): Card
    {
        return new Card(
            name,
            CardType.FORWARD,
            elements,
            cost,
            categories,
            text,
            set,
            setIndex,
            rarity,
            tags,
            exBurst,
            abilities,
            jobs,
            power,
            multicard,
        );
    }

    static Backup(
        name: string,
        elements: CardElement[],
        cost: number,
        categories: string[],
        text: string,
        set: CardSet,
        setIndex: number,
        rarity: CardRarity,
        tags: string[],
        exBurst: boolean,
        abilities: Ability[],
        jobs: string[] | undefined,
        power: number | undefined,
        multicard: boolean | undefined,
    ): Card
    {
        return new Card(
            name,
            CardType.BACKUP,
            elements,
            cost,
            categories,
            text,
            set,
            setIndex,
            rarity,
            tags,
            exBurst,
            abilities,
            jobs,
            power,
            multicard,
        );
    }

    static Summon(
        name: string,
        elements: CardElement[],
        cost: number,
        categories: string[],
        text: string,
        set: CardSet,
        setIndex: number,
        rarity: CardRarity,
        tags: string[],
        exBurst: boolean,
        abilities: Ability[],
    ): Card
    {
        return new Card(
            name,
            CardType.SUMMON,
            elements,
            cost,
            categories,
            text,
            set,
            setIndex,
            rarity,
            tags,
            exBurst,
            abilities,
            undefined,
            undefined,
            undefined,
        );
    }
    
    static Monster(
        name: string,
        elements: CardElement[],
        cost: number,
        categories: string[],
        text: string,
        set: CardSet,
        setIndex: number,
        rarity: CardRarity,
        tags: string[],
        exBurst: boolean,
        abilities: Ability[],
        jobs: string[] | undefined,
        power: number | undefined,
        multicard: boolean | undefined,
    ): Card
    {
        return new Card(
            name,
            CardType.MONSTER,
            elements,
            cost,
            categories,
            text,
            set,
            setIndex,
            rarity,
            tags,
            exBurst,
            abilities,
            jobs,
            power,
            multicard,
        );
    }

    get name(): string
    {
        return this.myName;
    }

    get type(): CardType
    {
        return this.myType;
    }

    get elements(): CardElement[]
    {
        return this.myElements;
    }

    get cost(): number
    {
        return this.myCost;
    }

    get categories(): string[]
    {
        return this.myCategories;
    }

    get text(): string
    {
        return this.myText;
    }

    get set(): CardSet
    {
        return this.mySet;
    }

    get setIndex(): number
    {
        return this.mySetIndex;
    }

    get rarity(): CardRarity
    {
        return this.myRarity;
    }

    get tags(): string[]
    {
        return this.myTags;
    }

    get exBurst(): boolean
    {
        return this.isEXBurst;
    }

    get abilities(): Ability[]
    {
        return this.myAbilities;
    }

    get jobs(): string[] | undefined
    {
        return this.myJobs;
    }

    get power(): number | undefined
    {
        return this.myPower;
    }

    get multiCard(): boolean | undefined
    {
        return this.isMulticard;
    }

    get setID(): string
    {
        return `${this.set.abbreviation}-${this.setIndex.toString().padStart(3, '0')}`;
    }

    get uniqueName(): string
    {
        return `[${this.setID}] ${this.name}`;
    }
}