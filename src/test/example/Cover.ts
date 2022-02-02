import { DomainObjects } from "../../main/domain/collection/DomainObjects";
import { DomainValidation } from "../../main/domain/DomainObject";
import { DomainPrimitive } from "../../main/domain/value/DomainPrimitive";
import { ValueObject } from "../../main/domain/value/ValueObject";
import { Color } from "./Color";

export class Cover extends ValueObject<Cover> {

    private readonly _color!: Color;

    constructor(color: Color) {
        super();
        this._color = color;
    }

    deepCopy(): Cover {
        return new Cover(this._color.deepCopy());
    }
    values(): (ValueObject<any> | DomainPrimitive<any, any> | DomainObjects<ValueObject<any> | DomainPrimitive<any, any>, any>)[] {
        return [this._color];
    }
    validations(): DomainValidation<Cover>[] {
        return [
            this.check(() => this.color !== null)
                .orElse("any cover must have a color")
        ]
    }
    className(): string {
        return this.constructor.name;
    }

    color(): Color {
        return this._color;
    }

    adjective(): string {
        return `with ${this._color.value()} cover`
    }
}