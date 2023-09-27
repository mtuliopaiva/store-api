import { IsEmail, IsNotEmpty, isNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email:string;

    @MinLength(8)
    password:string;
}