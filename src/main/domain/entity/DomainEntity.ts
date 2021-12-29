import { notNull } from "../../Functions";
import { DomainConstraintViolation, DomainObject } from "../DomainObject";
import { DomainPrimitive } from "../value/DomainPrimitive";
import { HasIdentifier, Id } from "../Id";
import { ValueObject } from "../value/ValueObject";
import { DomainObjects } from "../collection/DomainObjects";

export abstract class DomainEntity<E extends DomainEntity<E>> extends DomainObject<E> implements HasIdentifier<E> {
    violations(): DomainConstraintViolation[] {
        return this
            .values()
            .map(value => value.violations())
            .flat()
            .concat(
                this.validations()
                    .map(validation => validation.violation())
                    .filter(notNull));
    }
    equalTo(that: DomainObject<any>): boolean {
        return areSameType(this, that) && haveSameId(this, that as DomainEntity<any>);
    }
    abstract id(): Id<E>;
    abstract values(): DomainEntityProperty[]
}
const areSameType = (_this: DomainEntity<any>, that: DomainObject<any>): boolean => that instanceof DomainEntity && _this.constructor === that.constructor;
const haveSameId = (_this: DomainEntity<any>, that: DomainEntity<any>): boolean => _this.id().equalTo(that.id());

export type DomainEntityProperty = DomainPrimitive<any, any> | ValueObject<any> | DomainObjects<ValueObject<any> | DomainPrimitive<any, any>>;