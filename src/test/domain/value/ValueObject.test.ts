import { Cover } from "../../example/Cover";
import { Color } from "../../example/Color";


test("deepcopy", () => {
    const sut = new Cover(new Color("brown"));
    const actual = sut.deepCopy();
    expect(actual).toStrictEqual(sut);
    expect(actual.color()).toStrictEqual(sut.color())
    expect(actual.color()).not.toBe(sut.color());
});
describe(
    "equalTo",
    () => {
        test("equivalent", () => {
            const sut: Cover = new Cover(new Color("brown"));
            const actual = sut.equalTo(new Cover(new Color("brown")));
            expect(actual).toBeTruthy();
        });
        test("not equivalent", () => {
            const sut: Cover = new Cover(new Color("brown"));
            const actual = sut.equalTo(new Cover(new Color("white")));
            expect(actual).toBeFalsy();
        });
    })
