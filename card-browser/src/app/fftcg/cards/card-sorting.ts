import { Card } from "./card";
import { CardType } from "./card-type";
import { CardElement } from "./card-element";

export class CardSorting
{
    static CompoundSort<T>(lhs: T, rhs: T, ...comparators: ((lhs: T, rhs: T) => number)[]): number {
        for (let i = 0; i < comparators.length; ++i) {
            const result = comparators[i](lhs, rhs);
            if (result !== 0) {
                return result;
            }           
        }
        return 0;
    }

    static BySet(lhs: Card, rhs: Card): number
    {
        return lhs.set.order - rhs.set.order;
    }

    static BySetIndex(lhs: Card, rhs: Card): number
    {
        return lhs.setIndex - rhs.setIndex;
    }

    static BySetID(lhs: Card, rhs: Card): number
    {
        return CardSorting.CompoundSort(lhs, rhs, CardSorting.BySet, CardSorting.BySetIndex);
    }

    static ByName(lhs: Card, rhs: Card): number
    {
        return lhs.name.localeCompare(rhs.name);
    }

    static ByType(lhs: Card, rhs: Card): number
    {
        const typeValues = Object.values(CardType);
        return typeValues.indexOf(lhs.type) - typeValues.indexOf(rhs.type);
    }

    static ByElements(lhs: Card, rhs: Card): number
    {
        if (lhs.elements.length === rhs.elements.length)
        {
            const elementValues = Object.values(CardElement);
            for (let i = 0; i < lhs.elements.length; ++i)
            {
                const result = elementValues.indexOf(lhs.elements[i]) - elementValues.indexOf(rhs.elements[i]);
                if (result !== 0) return result;
            }
        }

        return lhs.elements.length - rhs.elements.length;
    }

    static ByCost(lhs: Card, rhs: Card): number
    {
        return lhs.cost - rhs.cost;
    }
}