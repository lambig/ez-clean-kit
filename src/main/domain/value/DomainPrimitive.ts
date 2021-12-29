import { notNull } from "../../Functions";
import { DomainConstraintViolation, DomainObject } from "../DomainObject";

export abstract class DomainPrimitive<P extends DomainPrimitive<P, V>, V extends (string | number | bigint | boolean | symbol)> extends DomainObject<P> {
    violations(): DomainConstraintViolation[] {
        return this
            .validations()
            .map(validation => validation.violation())
            .filter(notNull);
    }
    equalTo(that: DomainObject<any>): boolean {
        return areSameType(this, that) && haveSameValue(this, that as DomainPrimitive<any, any>);
    }
    /**
     * @returns primitive value
     */
    abstract value(): V;
}
const areSameType = (_this: DomainPrimitive<any, any>, that: DomainObject<any>): boolean => that instanceof DomainPrimitive && _this.constructor === that.constructor;
const haveSameValue = (_this: DomainPrimitive<any, any>, that: DomainObject<any>): boolean => _this.value() === (that as DomainPrimitive<any, any>).value();