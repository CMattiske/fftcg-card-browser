import { IAbility } from "./ability";

export enum ECardType
{
    FORWARD = "forward",
    BACKUP = "backup",
    SUMMON = "summon",
    MONSTER = "monster",
}

export enum EElement
{
    FIRE = "fire",
    ICE = "ice",
    WIND = "wind",
    EARTH = "earth",
    LIGHTNING = "lightning",
    WATER = "water",
    LIGHT = "light",
    DARK = "dark",
}

export enum ERarity
{
    COMMON = "common",
    RARE = "rare",
    HERO = "hero",
    LEGEND = "legend",
    STARTER = "starter",
    PROMO = "promo",
    BOSS = "boss",
}

export interface ICard
{
    id?: number,

    name: string,
    type: ECardType,
    elements: EElement[],
    cost: number,
    categories: string[],
    text: string,
    jobs: string[],
    power: number,
    multicard: boolean,

    exburst: boolean,
    abilities: IAbility[],

    set: string,
    index: number,
    rarity: ERarity,

    tags: string[],
    guid: string,
}