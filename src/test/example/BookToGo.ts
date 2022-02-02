import { DomainValidation } from "../../main/domain/DomainObject";
import { Aggregate, AggregateProperty } from "../../main/domain/entity/Aggregate";
import { Id } from "../../main/domain/Id";
import { Cover } from "./Cover";
import { StockedBook } from "./StockedBook";

export class BookToGo extends Aggregate<BookToGo> {

    private readonly _book!: StockedBook;
    private readonly _cover!: Cover;

    constructor(book: StockedBook, cover: Cover) {
        super();
        this._book = book;
        this._cover = cover;
    }

    id(): Id<BookToGo> {
        return new BookToGoId(`${this._book.id()} ${this._cover.adjective()}`);
    }
    values(): AggregateProperty[] {
        return [this._book, this._cover];
    }
    deepCopy(): BookToGo {
        return new BookToGo(this._book.deepCopy(), this._cover.deepCopy());
    }
    validations(): DomainValidation<BookToGo>[] {
        return [
            this.check(() => this._book !== null)
                .orElse("must have a book to pack")
        ];
    }
    className(): string {
        return this.constructor.name;
    }
    book(): StockedBook {
        return this._book;
    }
    cover(): Cover {
        return this._cover;
    }
}
export class BookToGoId extends Id<BookToGo>{
    constructor(id: string) {
        super(id);
    }
    deepCopy(): Id<BookToGo> {
        return new BookToGoId(this.value());
    }
    className(): string {
        return this.constructor.name;
    }
}