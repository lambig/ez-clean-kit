import { DomainObjects } from "../../main/domain/collection/DomainObjects";
import { DomainValidation } from "../../main/domain/DomainObject";
import { StockedBook } from "./StockedBook";

export class StockedBooks extends DomainObjects<StockedBook, StockedBooks>{
    validations(): DomainValidation<StockedBooks>[] {
        return [];
    }
    static of(elements: StockedBook[]): StockedBooks {
        return new StockedBooks(elements);
    }
    constructor(elements: StockedBook[]) {
        super(elements);
    }
    deepCopy(): StockedBooks {
        return new StockedBooks(this.deepCopies());
    }
    className(): string {
        return this.constructor.name;
    }
}