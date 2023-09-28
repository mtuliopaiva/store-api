import { Injectable } from "@nestjs/common";

//Injectable - Este decorador é usado para marcar uma classe como um 
//serviço injetável no Nest.js. Os serviços são usados 
//para encapsular a lógica de negócios e podem ser injetados em controladores, outros serviços, etc.

//Agora ele é um provider, com isso sera criado o objeto de forma automática
@Injectable()
export class UserRepository{
    private users = [];

    async save(user){
        this.users.push(user);
    }

    async list(){
        return this.users;
    }

    async emailExists(email:string) {
        const possibleUser = this.users.find(
            user=>user.email === email
        );
        return possibleUser !== undefined;
    }
}