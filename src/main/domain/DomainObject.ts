import { F_Supplier, F_Function } from "../Functions";

export abstract class DomainObject<D extends DomainObject<D>> {
    /**
     * @returns object's equivalency with the target
     * @param that target instance
     */
    abstract equalTo(that: DomainObject<any>): boolean;
    /**
     * @returns a deep copy of this instance
     */
    abstract deepCopy(): D;
    /**
     * @returns a domain object's validations
     */
    abstract validations(): DomainValidation<D>[];
    /**
     * @returns violations against the constraints on this instance declared in validations
     */
    abstract violations(): DomainConstraintViolation[];
    /**
     * you can describe validation with this method like:
     * 
     * this.check(() => this.id().isNumeric()).orElse(() => new IdCharacterViolation("id must be numeric"))
     * 
     * @param constraint constraint of this object
     * @returns partial application of validation
     */
    check(constraint: Constraint<D>): PartialApplication<D> {
        return new PartialApplication<D>(constraint);
    }
    /**
     * @tutorial just return "this.constructor.name" in every single implementation!
     * @returns className of the specific DomainObject
     */
    abstract className(): string;
}

/**
 * a pair of constraint on a domain object / violation descriptor
 */
export class DomainValidation<E extends DomainObject<E>> {
    constructor(constraint: Constraint<E>, violationDescriptor: ViolationDescriptor<E>) {
        this.constraint = constraint;
        this.violationDescriptor = violationDescriptor;
    }
    private readonly constraint: Constraint<E>;
    private readonly violationDescriptor: ViolationDescriptor<E>;

    /**
     * @returns description of violation or null
     */
    violationOf(target: DomainObject<any>): DomainConstraintViolation | null {
        return this.constraint() ? null : this.violationDescriptor().withClassNameOf(target);
    }


}

type Constraint<D extends DomainObject<D>> = F_Supplier<boolean>;
type ViolationDescriptor<D extends DomainObject<D>> = F_Supplier<DomainConstraintViolation>;

class PartialApplication<D extends DomainObject<D>> {
    constructor(constraint: Constraint<D>) {
        this.constraint = constraint;
    }
    private readonly constraint: Constraint<D>;
    /**
     * complete a validation from the previously given constraint and violation descriptor given here
     * @param violationDescriptor 
     * @returns validation
     */
    orElse(violationDescriptor: ViolationDescriptor<D>): DomainValidation<D> {
        return new DomainValidation<D>(this.constraint, violationDescriptor);
    }
}
/**
 * Interface for expressing domain constraint violations
 */
export abstract class DomainConstraintViolation {
    private domainObjectClassName: string = "";
    withClassNameOf(domainObject: DomainObject<any>): DomainConstraintViolation {
        this.domainObjectClassName = domainObject.className();
        return this;
    }
    abstract description(): string;
    /**
     * @returns the stringfied content
     */
    stringified(): string {
        return `${this.domainObjectClassName}: ${this.description()}`
    }
}