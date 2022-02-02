import { BookId } from "../../example/BookId";
import { BookToGo } from "../../example/BookToGo";
import { Color } from "../../example/Color";
import { Cover } from "../../example/Cover";
import { Stock } from "../../example/Stock";
import { StockedBook } from "../../example/StockedBook";

test("deepcopy", () => {
    const sut = new BookToGo(
        StockedBook.of(
            BookId.of("abcde"),
            Stock.of(3)),
        new Cover(new Color("brown")));
    const actual = sut.deepCopy();
    expect(actual).toStrictEqual(sut);
    expect(actual).not.toBe(sut);

    expect(actual.id()).toStrictEqual(sut.id())
    expect(actual.id()).not.toBe(sut.id())

    expect(actual.book()).toStrictEqual(sut.book());
    expect(actual.book()).not.toBe(sut.book());

    expect(actual.cover()).toStrictEqual(sut.cover());
    expect(actual.cover()).not.toBe(sut.cover());
});
describe(
    "equalTo",
    () => {
        test("equivalent", () => {
            const sut = new BookToGo(
                StockedBook.of(
                    BookId.of("abcde"),
                    Stock.of(3)),
                new Cover(new Color("brown")));
            const actual = sut.equalTo(
                new BookToGo(
                    StockedBook.of(
                        BookId.of("abcde"),
                        Stock.of(3)),
                    new Cover(new Color("brown"))));
            expect(actual).toBeTruthy();
        });
        test("not equivalent but same id", () => {
            const sut = new BookToGo(
                StockedBook.of(
                    BookId.of("abcde"),
                    Stock.of(3)),
                new Cover(new Color("brown")));
            const actual = sut.equalTo(
                new BookToGo(
                    StockedBook.of(
                        BookId.of("abcde"),
                        Stock.of(15)),
                    new Cover(new Color("brown"))));
            expect(actual).toBeTruthy();
        });
        test("different id", () => {
            const sut = new BookToGo(
                StockedBook.of(
                    BookId.of("abcde"),
                    Stock.of(3)),
                new Cover(new Color("brown")));
            const actual = sut.equalTo(
                new BookToGo(
                    StockedBook.of(
                        BookId.of("abcde"),
                        Stock.of(3)),
                    new Cover(new Color("purple"))));
            expect(actual).toBeFalsy();
        });
    })