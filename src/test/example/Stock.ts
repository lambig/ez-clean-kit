import { DomainObject, DomainValidation } from "../../main/domain/DomainObject";
import { DomainPrimitive } from "../../main/domain/value/DomainPrimitive";

export class Stock extends DomainPrimitive<Stock, number> {
    private readonly _value: number;
    constructor(value: number) {
        super();
        this._value = value;
    }
    static of(value: number): Stock {
        return new Stock(value);
    }
    value(): number {
        return this._value;
    }
    deepCopy(): Stock {
        return new Stock(this._value);
    }
    validations(): DomainValidation<Stock>[] {
        return [
            this
                .check(() => this._value > -1)
                .orElse("stock can't be a negative value")];
    }
    className(): string {
        return this.constructor.name;
    }
    isEmpty(): boolean {
        return this._value === 0;
    }
    notEmpty(): boolean {
        return !this.isEmpty();
    }
}