import { Id } from "../../main/domain/Id";
import { AggregateProperty, Aggregate } from "../../main/domain/entity/Aggregate"
import { DomainValidation } from "../../main/domain/DomainObject";
import { StockedBook } from "./StockedBook";
import { StockedBooks } from "./StockedBooks";

export class BookShelf extends Aggregate<BookShelf>{
    className(): string {
        return this.constructor.name;
    }

    private readonly _id!: Id<BookShelf>;
    private readonly books!: StockedBooks


    static of(id: Id<BookShelf>, books: StockedBook[]) {
        return new BookShelf(id, new StockedBooks(books));
    }

    constructor(id: Id<BookShelf>, books: StockedBooks) {
        super();
        this._id = id;
        this.books = books;
    }

    id(): Id<BookShelf> {
        return this._id;
    }
    values(): AggregateProperty[] {
        return [this._id, this.books];
    }
    deepCopy(): BookShelf {
        return new BookShelf(this._id.deepCopy(), this.books.deepCopy());
    }
    validations(): DomainValidation<StockedBook>[] {
        return [];
    }
}
