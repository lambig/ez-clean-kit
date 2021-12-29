import { DomainConstraintViolation, DomainObject, DomainValidation } from "./DomainObject";
import { DomainPrimitive } from "./value/DomainPrimitive";

export class Id<E> extends DomainPrimitive<Id<E>, string> {
    validations(): DomainValidation<Id<E>>[] {
        return [
            this.check(() => !!this.value()).orElse(() => new NoIdSpecified("id is not specified!"))
        ];
    }
    private constructor(id: string) {
        super();
        this.id = id;
    }
    private readonly id!: string;

    static of<X>(id: string): Id<X> {
        return new Id<X>(id);
    }
    value(): string {
        return this.id;
    }
    deepCopy(): Id<E> {
        return new Id<E>(this.id);
    }
}

class NoIdSpecified implements DomainConstraintViolation {
    constructor(message: string) {
        this.message = message;
    }
    stringified(): String {
        return this.message;
    }
    private readonly message;
}

/**
 * an interface that can return a unique identifier object
 * 
 * in the implementation of D, it is assumed that equivalence evaluation is done by identifiers rather than properties
 */
export interface HasIdentifier<D extends DomainObject<D>> {
    id(): Id<D>;
}