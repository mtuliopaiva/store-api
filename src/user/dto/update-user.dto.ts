import { IsEmail, IsNotEmpty, isNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { uniqueEmail, UniqueEmailValidator } from "../validations/unique-email.validator";


export class UpdateUserDTo {

    @IsString()
    @IsNotEmpty({message: 'Name cannot be empty'})
    @IsOptional() // Apenas se for informado o nome
    name: string;
    
    @IsEmail()
    @uniqueEmail({message: "Email exists with another user"})
    @IsOptional()
    email:string;

    @MinLength(8, {message: 'The password need to have 8 characters at least'})
    @IsOptional()
    password:string;
}