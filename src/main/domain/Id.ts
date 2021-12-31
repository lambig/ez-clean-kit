import { DomainConstraintViolation, DomainObject, DomainValidation } from "./DomainObject";
import { DomainPrimitive } from "./value/DomainPrimitive";

export abstract class Id<E> extends DomainPrimitive<Id<E>, string> {
    validations(): DomainValidation<Id<E>>[] {
        return [
            this.check(() => !!this.value()).orElse(() => new NoIdSpecified("id is not specified!"))
        ];
    }
    protected constructor(id: string) {
        super();
        this.id = id;
    }
    private readonly id!: string;
    value(): string {
        return this.id;
    }
    /**
     * @tutorial just return "new IdImplementation(this.value)"
     */
    abstract deepCopy(): Id<E>;
}

class NoIdSpecified extends DomainConstraintViolation {
    constructor(message: string) {
        super();
        this.message = message;
    }
    description(): string {
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