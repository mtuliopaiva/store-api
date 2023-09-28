import { IsEmail, IsNotEmpty, isNotEmpty, IsString, MinLength } from "class-validator";
import { uniqueEmail, UniqueEmailValidator } from "../validations/unique-email.validator";


export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    @uniqueEmail({message: "Email exists with another user"})
    email:string;

    @MinLength(8)
    password:string;
}