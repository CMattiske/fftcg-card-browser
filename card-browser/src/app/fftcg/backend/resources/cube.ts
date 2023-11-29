export interface ICube {
    id?: number,

    name: string,

    cards: ICubeCard[],
}

export interface ICubeCard {
    setID: string,
    
    rank: number,
}