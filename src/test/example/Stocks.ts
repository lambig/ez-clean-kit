import { DomainObjects } from "../../main/domain/collection/DomainObjects";
import { DomainValidation } from "../../main/domain/DomainObject";
import { Stock } from "./Stock";

export class Stocks extends DomainObjects<Stock, Stocks> {
    validations(): DomainValidation<Stocks>[] {
        return [
            this.check(() => this.elements.length < 5)
                .orElse("size must not exceed 4")];
    }
    static of(elements: Stock[]): Stocks {
        return new Stocks(elements)
    }
    deepCopy(): Stocks {
        return new Stocks(this.deepCopies());
    }
    className(): string {
        return this.constructor.name;
    }
    get(index: number) {
        return this.elements[index];
    }
}