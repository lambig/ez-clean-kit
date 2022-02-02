import { notNull } from "toolbox-ts";
import { DomainConstraintViolation, DomainObject } from "../DomainObject";
import { DomainPrimitive } from "../value/DomainPrimitive";
import { DomainEntity } from "./DomainEntity";
import { HasIdentifier, Id } from "../Id";
import { ValueObject } from "../value/ValueObject";
import { DomainObjects } from "../collection/DomainObjects";

export abstract class Aggregate<A extends Aggregate<A>> extends DomainObject<A> implements HasIdentifier<A>{
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
        return areSameType(this, that) && this.id().equalTo((that as Aggregate<any>).id());
    }
    abstract id(): Id<A>;
    abstract values(): AggregateProperty[];
}
const areSameType = (_this: Aggregate<any>, that: DomainObject<any>): boolean => that instanceof Aggregate && _this.className() === that.className();
export type AggregateProperty =
    DomainPrimitive<any, any> |
    ValueObject<any> |
    DomainEntity<any> |
    Aggregate<any> |
    DomainObjects<
        ValueObject<any> |
        DomainPrimitive<any, any> |
        DomainEntity<any> |
        Aggregate<any>,
        any>;