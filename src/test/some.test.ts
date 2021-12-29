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

    private readonly _id!: Id<BookShelf>;
    private readonly books!: DomainObjects<StockedBook>

    static of(id: Id<BookShelf>, books: DomainObjects<StockedBook>) {
        return new BookShelf(id, books);
    }

    constructor(id: Id<BookShelf>, books: DomainObjects<StockedBook>) {
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
            this.check(() => this.stock.notEmpty()).orElse(() => new StringViolationMessage("you've got to have at least 1 stock to register a stocked book"))
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
class StringViolationMessage implements DomainConstraintViolation {
    constructor(message: String) {
        this.message = message;
    }
    private readonly message;
    stringified(): String {
        return this.message;
    }
}
class Stock<D extends DomainObject<D>> extends DomainPrimitive<Stock<D>, number>{
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
            this.check(() => this.stock > -1).orElse(() => new StringViolationMessage("stock can't be a negative value"))
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


test("valid", () => {
    const valid = StockedBook.of(
        Id.of("abcde"),
        Stock.of(15));

    expect(valid.violations().map(e => e.stringified())).toStrictEqual([]);
});
test("unreal", () => {
    const unreal = StockedBook.of(
        Id.of("abcde"),
        Stock.of(-1));

    expect(unreal.violations().map(e => e.stringified())).toStrictEqual(["stock can't be a negative value", "you've got to have at least 1 stock to register a stocked book"]);
});
test("nostock", () => {
    const nostock = StockedBook.of(
        Id.of("abcde"),
        Stock.of(0));

    expect(nostock.violations().map(e => e.stringified())).toStrictEqual(["you've got to have at least 1 stock to register a stocked book"]);
});
test("nostock", () => {
    const books =
        DomainObjects.of([
            StockedBook.of(
                Id.of("abcde"),
                Stock.of(15)),
            StockedBook.of(
                Id.of("fghijk"),
                Stock.of(-1)),
            StockedBook.of(
                Id.of(""),
                Stock.of(4))
        ]);

    expect(books.violations().map(e => e.stringified())).toStrictEqual(["you've got to have at least 1 stock to register a stocked book"]);
});
test("nostock", () => {
    const shelf =
        BookShelf.of(
            Id.of("shelfA"),
            DomainObjects.of([
                StockedBook.of(
                    Id.of("abcde"),
                    Stock.of(15)),
                StockedBook.of(
                    Id.of("fghijk"),
                    Stock.of(-1)),
                StockedBook.of(
                    Id.of(""),
                    Stock.of(4))
            ])
        );
    expect(shelf.violations().map(e => e.stringified())).toStrictEqual(["you've got to have at least 1 stock to register a stocked book"]);
});