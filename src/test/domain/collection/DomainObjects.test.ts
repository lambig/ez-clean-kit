import { AnotherStocks } from "../../example/AnotherStocks";
import { Stock } from "../../example/Stock";
import { Stocks } from "../../example/Stocks";

test("deepcopy", () => {
    const sut: Stocks = Stocks.of([Stock.of(15), Stock.of(Number.MAX_VALUE)]);
    const actual = sut.deepCopy();
    expect(actual).toStrictEqual(sut);
    expect(actual.get(1)).toStrictEqual(sut.get(1))
    expect(actual.get(1)).not.toBe(sut.get(1));
});
describe(
    "equalTo",
    () => {
        test("equivalent", () => {
            const sut: Stocks = Stocks.of([Stock.of(15), Stock.of(Number.MAX_VALUE)]);
            const actual = sut.equalTo(Stocks.of([Stock.of(15), Stock.of(Number.MAX_VALUE)]));
            expect(actual).toBeTruthy();
        });
        test("not equivalent", () => {
            const sut: Stocks = Stocks.of([Stock.of(15), Stock.of(0)]);
            const actual = sut.equalTo(AnotherStocks.of([Stock.of(15), Stock.of(Number.MAX_VALUE)]));
            expect(actual).toBeFalsy();
        });
        test("empty", () => {
            const sut: Stocks = Stocks.of([]);
            const actual = sut.equalTo(Stocks.of([]));
            expect(actual).toBeTruthy();
        });
    })

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
