import { DomainValidation } from "../../main/domain/DomainObject";
import { DomainPrimitive } from "../../main/domain/value/DomainPrimitive";

export class Color extends DomainPrimitive<Color, string> {
    private readonly color: string;

    constructor(color: string) {
        super();
        this.color = color;
    }

    value(): string {
        return this.color;
    }
    deepCopy(): Color {
        return new Color(this.color);
    }
    validations(): DomainValidation<Color>[] {
        return [];
    }
    className(): string {
        return this.constructor.name;
    }
}
