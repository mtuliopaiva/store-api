import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";

@Injectable()
@ValidatorConstraint({async: true}) // fala que é uma validação asincrona
export class UniqueEmailValidator implements ValidatorConstraintInterface{
    constructor(private userRepository: UserRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userEmailExists = await this.userRepository.emailExists(value);
        return !userEmailExists;
    }
}

//Criando o novo decorator
//Opções de Validação que são do tipo ValidationOptions
export const uniqueEmail = (optionValidations: ValidationOptions) => {
    return (object: Object, prop: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: prop,
            options: optionValidations,
            constraints: [],
            validator: UniqueEmailValidator
    })
}
}