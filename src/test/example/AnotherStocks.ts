import { DomainObjects } from "../../main/domain/collection/DomainObjects";
import { DomainValidation } from "../../main/domain/DomainObject";
import { Stock } from "./Stock";
import { Stocks } from "./Stocks";

export class AnotherStocks extends DomainObjects<Stock, Stocks> {
    validations(): DomainValidation<Stocks>[] {
        return [
            this.check(() => this.elements.length < 5)
                .orElse("size must not exceed 4")];
    }
    static of(elements: Stock[]): AnotherStocks {
        return new Stocks(elements)
    }
    deepCopy(): AnotherStocks {
        return new Stocks(this.deepCopies());
    }
    className(): string {
        return this.constructor.name;
    }
    get(index: number) {
        return this.elements[index];
    }
}