export interface IDeckList
{
    id?: number,

    name: string,
    cards: IDeckListCard[],
}

export interface IDeckListCard
{
    setID: string,
    
    count: number
}