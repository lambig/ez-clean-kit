import { DomainConstraintViolation, DomainObject, DomainValidation } from "../DomainObject";

export class DomainObjects<D extends DomainObject<D>> extends DomainObject<DomainObjects<D>>{
    private readonly elements: D[];

    static of<E extends DomainObject<E>>(elements: E[]): DomainObjects<E> {
        return new DomainObjects<E>(elements);
    }

    constructor(elements: D[]) {
        super();
        this.elements = elements;
    }


    equalTo(that: DomainObject<any>): boolean {
        const haveExactSameElements = (that: DomainObjects<any>) => (element: DomainObject<any>, index: number) => element.equalTo((that as DomainObjects<any>).elements[index]);
        return areSameType(this, that) && this.elements.every(haveExactSameElements(that as DomainObjects<any>));
    }
    deepCopy(): DomainObjects<D> {
        return new DomainObjects<D>(this.elements.map(element => element.deepCopy()));
    }
    validations(): DomainValidation<DomainObjects<D>>[] {
        return [];
    }
    violations(): DomainConstraintViolation[] {
        return this.elements.map(element => element.violations()).flat();
    }

}
const areSameType = (_this: DomainObjects<any>, that: DomainObject<any>): boolean => that instanceof DomainObjects && _this.constructor === that.constructor;
