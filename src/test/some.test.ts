import { DomainConstraintViolation, DomainObject, DomainValidation } from "../main/domain/DomainObject";
import { DomainPrimitive } from "../main/domain/value/DomainPrimitive"
import { AggregateProperty, Aggregate } from "../main/domain/entity/Aggregate"
import { DomainEntity, DomainEntityProperty } from "../main/domain/entity/DomainEntity"
import { Id } from "../main/domain/Id";
import { DeleteResult, Repository, SaveResult, UpdateResult } from "../main/repository/Repository";
import { ValueObject } from "../main/domain/value/ValueObject";
import { DomainObjects } from "../main/domain/collection/DomainObjects";

interface BookShelfRepository extends Repository<BookShelf> {
}

class BookShelfRepositoryImpl implements BookShelfRepository {
    findById(id: Id<BookShelf>): Promise<BookShelf> {
        throw new Error("Method not implemented.");
    }
    save(entityOrAggregate: BookShelf): Promise<SaveResult<BookShelf>> {
        throw new Error("Method not implemented.");
    }
    update(entityOrAggregate: BookShelf): Promise<UpdateResult<BookShelf>> {
        throw new Error("Method not implemented.");
    }
    delete(entityOrAggregate: BookShelf): Promise<DeleteResult<BookShelf>> {
        throw new Error("Method not implemented.");
    }

}

class BookShelf extends Aggregate<BookShelf>{
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
    values(): (AggregateProperty)[] {
        return [this._id, this.books];
    }
    deepCopy(): BookShelf {
        return new BookShelf(this._id.deepCopy(), this.books.deepCopy());
    }
    validations(): DomainValidation<StockedBook>[] {
        return [];
    }
}

class StockedBook extends DomainEntity<StockedBook>{
    className(): string {
        return this.constructor.name;
    }

    private readonly _id!: Id<StockedBook>;
    private readonly stock!: Stock<StockedBook>;

    static of(id: Id<StockedBook>, stock: Stock<StockedBook>): StockedBook {
        return new StockedBook(id, stock);
    }

    private constructor(id: Id<StockedBook>, stock: Stock<StockedBook>) {
        super();
        this._id = id;
        this.stock = stock;
    }

    values(): (DomainEntityProperty)[] {
        return [this._id, this.stock];
    }
    validations(): DomainValidation<StockedBook>[] {
        return [
            this.check(() => this.stock.notEmpty())
                .orElse("you've got to have at least 1 stock to register a stocked book")
        ]
    }
    deepCopy(): StockedBook {
        return new StockedBook(
            this._id.deepCopy(),
            this.stock.deepCopy());
    }
    id(): Id<StockedBook> {
        return this._id;
    }
}
class StockedBooks extends DomainObjects<StockedBook, StockedBooks>{
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
class StringViolationMessage extends DomainConstraintViolation {
    constructor(message: string) {
        super();
        this.message = message;
    }
    private readonly message;
    description(): string {
        return this.message;
    }
}
class Stock<D extends DomainObject<D>> extends DomainPrimitive<Stock<D>, number>{
    className(): string {
        return this.constructor.name;
    }
    private readonly stock!: number;

    static of<E extends DomainObject<E>>(stock: number): Stock<E> {
        return new Stock<E>(stock);
    }
    private constructor(value: number) {
        super();
        this.stock = value;
    }
    validations(): DomainValidation<Stock<D>>[] {
        return [
            this
                .check(() => this.stock > -1)
                .orElse("stock can't be a negative value")
        ];
    }
    
    value(): number {
        return this.stock;
    }

    deepCopy(): Stock<D> {
        return new Stock<D>(this.stock);
    }

    notEmpty(): boolean {
        return this.stock > 0;
    }
}
class BookId extends Id<StockedBook>{
    static of(value: string): BookId {
        return new BookId(value);
    }
    deepCopy(): Id<StockedBook> {
        throw new BookId(this.value());
    }
    className(): string {
        return this.constructor.name;
    }

}


test("valid", () => {
    const valid = StockedBook.of(
        BookId.of("abcde"),
        Stock.of(15));

    expect(valid.violations().map(e => e.stringified())).toStrictEqual([]);
});
test("unreal", () => {
    const unreal = StockedBook.of(
        BookId.of("abcde"),
        Stock.of(-1));

    expect(unreal.violations().map(e => e.stringified()))
        .toStrictEqual([
            "Stock: stock can't be a negative value",
            "StockedBook: you've got to have at least 1 stock to register a stocked book"]);
});
test("nostock", () => {
    const nostock = StockedBook.of(
        BookId.of("abcde"),
        Stock.of(0));

    expect(nostock.violations().map(e => e.stringified()))
        .toStrictEqual(["StockedBook: you've got to have at least 1 stock to register a stocked book"]);
});
test("nostock", () => {
    const books =
        StockedBooks.of([
            StockedBook.of(
                BookId.of("abcde"),
                Stock.of(15)),
            StockedBook.of(
                BookId.of("fghijk"),
                Stock.of(-1)),
            StockedBook.of(
                BookId.of(""),
                Stock.of(4))
        ]);

    expect(books.violations().map(e => e.stringified()))
        .toStrictEqual([
            "Stock: stock can't be a negative value",
            "StockedBook: you've got to have at least 1 stock to register a stocked book",
            "BookId: id is not specified!"
        ]);
});
test("nostock", () => {
    const shelf =
        BookShelf.of(
            BookId.of("shelfA"),
            [
                StockedBook.of(
                    BookId.of("abcde"),
                    Stock.of(15)),
                StockedBook.of(
                    BookId.of("fghijk"),
                    Stock.of(-1)),
                StockedBook.of(
                    BookId.of(""),
                    Stock.of(4))
            ]
        );
    expect(shelf.violations().map(e => e.stringified()))
        .toStrictEqual([
            "Stock: stock can't be a negative value",
            "StockedBook: you've got to have at least 1 stock to register a stocked book",
            "BookId: id is not specified!"
        ]);
});