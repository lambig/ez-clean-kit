import { notNull } from "../../Functions";
import { DomainObjects } from "../collection/DomainObjects";
import { DomainConstraintViolation, DomainObject } from "../DomainObject";
import { DomainPrimitive } from "./DomainPrimitive";

export abstract class ValueObject<V extends ValueObject<V>> extends DomainObject<V> {
    violations(): DomainConstraintViolation[] {
        return this
            .values()
            .map(value => value.violations())
            .flat()
            .concat(
                this.validations()
                    .map(validation => validation.violationOf(this))
                    .filter(notNull));
    }
    equalTo(that: DomainObject<any>): boolean {
        return areSameType(this, that) && haveSameValues(this, that as ValueObject<any>);
    }
    abstract deepCopy(): V;
    abstract values(): (ValueObject<any> | DomainPrimitive<any, any> | DomainObjects<ValueObject<any> | DomainPrimitive<any, any>, any>)[];
}

const areSameType = (_this: ValueObject<any>, that: DomainObject<any>): boolean => that instanceof ValueObject && _this.constructor === that.constructor;
const haveSameValues = (_this: ValueObject<any>, that: ValueObject<any>): boolean => _this.values().every((property, index) => property.equalTo((that as ValueObject<any>).values()[index]))
export type ValueObjectProperties = ValueObject<any> | DomainPrimitive<any, any> | DomainObjects<ValueObject<any> | DomainPrimitive<any, any>, any>;