import { notNull } from "toolbox-ts";
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
                    .map(validation => validation.violationOf(this))
                    .filter(notNull));
    }
    equalTo(that: DomainObject<any>): boolean {
        return areSameType(this, that) && haveSameId(this, that as DomainEntity<any>);
    }
    abstract id(): Id<E>;
    abstract values(): DomainEntityProperty[]
}
const areSameType = (_this: DomainEntity<any>, that: DomainObject<any>): boolean => that instanceof DomainEntity && _this.className() === that.className();
const haveSameId = (_this: DomainEntity<any>, that: DomainEntity<any>): boolean => _this.id().equalTo(that.id());

export type DomainEntityProperty = DomainPrimitive<any, any> | ValueObject<any> | DomainObjects<ValueObject<any> | DomainPrimitive<any, any>, any>;