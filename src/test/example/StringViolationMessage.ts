import { DomainConstraintViolation } from "../../main/domain/DomainObject";

export class StringViolationMessage extends DomainConstraintViolation {
    constructor(message: string) {
        super();
        this.message = message;
    }
    private readonly message;
    description(): string {
        return this.message;
    }
}