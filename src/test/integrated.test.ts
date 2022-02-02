import { Stock } from "./example/Stock";
import { StockedBook } from "./example/StockedBook";
import { StockedBooks } from "./example/StockedBooks";
import { BookShelf } from "./example/BookShelf";
import { BookId } from "./example/BookId";
import { BookToGo } from "./example/BookToGo";
import { Cover } from "./example/Cover";
import { Color } from "./example/Color";

describe("DomainObjects",
    () => {
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
                    "Stock: stock can't be a negative value"]);
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
                        BookId.of("lm"),
                        Stock.of(0)),
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
                    "BookId: id is not specified!"
                ]);
        });
    });
describe("Aggregate", () => {
    test("", () => {
        const toGo = new BookToGo(
            StockedBook.of(
                BookId.of("abcde"),
                Stock.of(3)),
            new Cover(new Color("brown"))
        )
        expect(toGo.violations().map(e => e.stringified()))
            .toStrictEqual([]);
    })
})
