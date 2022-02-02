import { DomainValidation } from "../../main/domain/DomainObject";
import { DomainEntity, DomainEntityProperty } from "../../main/domain/entity/DomainEntity";
import { Id } from "../../main/domain/Id";
import { Stock } from "./Stock"

export class StockedBook extends DomainEntity<StockedBook>{
    className(): string {
        return this.constructor.name;
    }

    private readonly _id!: Id<StockedBook>;
    private readonly _stock!: Stock;

    static of(id: Id<StockedBook>, stock: Stock): StockedBook {
        return new StockedBook(id, stock);
    }

    private constructor(id: Id<StockedBook>, stock: Stock) {
        super();
        this._id = id;
        this._stock = stock;
    }

    values(): (DomainEntityProperty)[] {
        return [this._id, this._stock];
    }
    validations(): DomainValidation<StockedBook>[] {
        return [
            this.check(() => this._stock.notEmpty())
                .orElse("you've got to have at least 1 stock to register a stocked book")
        ]
    }
    deepCopy(): StockedBook {
        return new StockedBook(
            this._id.deepCopy(),
            this._stock.deepCopy());
    }
    id(): Id<StockedBook> {
        return this._id;
    }
    stock(): Stock{
        return this._stock;
    }
}