import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Roles } from "src/utility/common/user-roles.enum";

@ValidatorConstraint({ name: "isValidRole", async: false })
export class IsValidRole implements ValidatorConstraintInterface {
    validate(role: any, args: ValidationArguments) {
        return Object.values(Roles).includes(role); // Check if the role is one of the enum values
    }

    defaultMessage(args: ValidationArguments) {
        return `Role must be either User, Nutritionist, or Admin`;
    }
}