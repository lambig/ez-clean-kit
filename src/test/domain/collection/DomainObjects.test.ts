import { DomainObjects } from "../../../main/domain/collection/DomainObjects";
import { DomainValidation } from "../../../main/domain/DomainObject";
import { DomainPrimitive } from "../../../main/domain/value/DomainPrimitive";

class Stock extends DomainPrimitive<Stock, number> {
    private readonly _value: number;
    constructor(value: number) {
        super();
        this._value = value;
    }
    static of(value: number): Stock {
        return new Stock(value);
    }
    value(): number {
        return this._value;
    }
    deepCopy(): Stock {
        return new Stock(this._value);
    }
    validations(): DomainValidation<Stock>[] {
        return [
            this
                .check(() => this._value > -1)
                .orElse("stock can't be a negative value")];
    }
    className(): string {
        return this.constructor.name;
    }
}
class Stocks extends DomainObjects<Stock, Stocks> {
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
test("deepcopy", () => {
    const sut: Stocks = Stocks.of([Stock.of(15), Stock.of(Number.MAX_VALUE)]);
    const actual = sut.deepCopy();
    expect(actual).toStrictEqual(sut);
    expect(actual.get(1)).toStrictEqual(sut.get(1))
    expect(actual.get(1)).not.toBe(sut.get(1));
});

test("equalTo", () => {
    const sut: Stocks = Stocks.of([Stock.of(15), Stock.of(Number.MAX_VALUE)]);
    const actual = sut.equalTo(Stocks.of([Stock.of(15), Stock.of(Number.MAX_VALUE)]));
    expect(actual).toBeTruthy();
});

test("className", () => {
    const sut: Stocks = new Stocks([]);
    const actual = sut.className();
    expect(actual).toBe("Stocks");
})
describe(
    "validate",
    () => {
        it("empty", () => {
            const sut: Stocks = new Stocks([]);
            const actual = sut.violations();
            expect(actual).toStrictEqual([]);
        })
        it("valid", () => {
            const sut: Stocks = new Stocks([Stock.of(5)]);
            const actual = sut.violations();
            expect(actual).toStrictEqual([]);
        })
        it("invalid element", () => {
            const sut: Stocks = new Stocks([Stock.of(4), Stock.of(-1), Stock.of(123456)]);
            const actual = sut.violations();
            expect(actual.map(violation => violation.stringified()))
                .toContain("Stock: stock can't be a negative value");
        })
        it("invalid collection", () => {
            const sut: Stocks = new Stocks([
                Stock.of(4), Stock.of(1), Stock.of(123456), Stock.of(0), Stock.of(123), Stock.of(5)
            ]);
            const actual = sut.violations();
            expect(actual.map(violation => violation.stringified()))
                .toContain("Stocks: size must not exceed 4");
        })
    }
)
