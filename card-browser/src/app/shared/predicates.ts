export class Predicates
{
    static Defined<T>(value: T | undefined): value is T
    {
        return value != null;
    } 
}