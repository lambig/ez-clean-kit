import { notNull } from "../../Functions";
import { DomainConstraintViolation, DomainObject, DomainValidation } from "../DomainObject";

export abstract class DomainObjects<D extends DomainObject<D>, C extends DomainObjects<D, C>> extends DomainObject<C>{
    protected readonly elements: D[];

    constructor(elements: D[]) {
        super();
        this.elements = elements;
    }


    equalTo(that: DomainObject<any>): boolean {
        const haveExactSameElements = (that: DomainObjects<any, any>) => (element: DomainObject<any>, index: number) => element.equalTo((that as DomainObjects<any, any>).elements[index]);
        return areSameType(this, that) && this.elements.every(haveExactSameElements(that as DomainObjects<any, any>));
    }

    /**
     * @tutorial just return "return new ImplementationClass(this.deepCopies())"
     */
    abstract deepCopy(): C;

    deepCopies(): D[] {
        return this.elements.map(element => element.deepCopy());
    }

    violations(): DomainConstraintViolation[] {
        return this.elements
            .map(element => element.violations())
            .flat()
            .concat(
                this
                    .validations()
                    .map(element => element.violationOf(this))
                    .filter(notNull));
    }

}
const areSameType = (_this: DomainObjects<any, any>, that: DomainObject<any>): boolean => that instanceof DomainObjects && _this.constructor === that.constructor;
