export class Predicates
{
    static Defined<T>(value: T | undefined | null): value is T
    {
        return value != null;
    } 
}