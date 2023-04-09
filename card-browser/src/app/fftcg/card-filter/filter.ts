import { Card } from "../cards/card";

export interface Filter {
    // Whether we should apply this filter
    get isRelevant(): boolean;

    // Whether the given card satisfies the filter
    satisfies(card: Card): boolean;
}