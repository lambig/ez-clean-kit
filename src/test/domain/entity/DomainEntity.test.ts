import { BookId } from "../../example/BookId";
import { Stock } from "../../example/Stock";
import { StockedBook } from "../../example/StockedBook";

test("deepcopy", () => {
    const sut = StockedBook.of(
        BookId.of("abcde"),
        Stock.of(15));
    const actual = sut.deepCopy();

    expect(actual).toStrictEqual(sut);
    expect(actual).not.toBe(sut);

    expect(actual.id()).toStrictEqual(sut.id())
    expect(actual.id()).not.toBe(sut.id())

    expect(actual.stock()).toStrictEqual(sut.stock());
    expect(actual.id()).not.toBe(sut.stock());
});
describe(
    "equalTo",
    () => {
        test("equivalent", () => {
            const sut = StockedBook.of(
                BookId.of("abcde"),
                Stock.of(15));
            const actual = sut.equalTo(StockedBook.of(
                BookId.of("abcde"),
                Stock.of(15)));
            expect(actual).toBeTruthy();
        });
        test("not equivalent but same id", () => {
            const sut = StockedBook.of(
                BookId.of("abcde"),
                Stock.of(15));
            const actual = sut.equalTo((StockedBook.of(
                BookId.of("abcde"),
                Stock.of(15))));
            expect(actual).toBeTruthy();
        });
        test("different id", () => {
            const sut = StockedBook.of(
                BookId.of("abcde"),
                Stock.of(15));
            const actual = sut.equalTo((StockedBook.of(
                BookId.of("abcdf"),
                Stock.of(15))));
            expect(actual).toBeFalsy();
        });
    })
