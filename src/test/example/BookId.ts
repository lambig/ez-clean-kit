import { Id } from "../../main/domain/Id";
import { StockedBook } from "./StockedBook";

export class BookId extends Id<StockedBook>{
    static of(value: string): BookId {
        return new BookId(value);
    }
    deepCopy(): Id<StockedBook> {
        return new BookId(this.value());
    }
    className(): string {
        return this.constructor.name;
    }

}
