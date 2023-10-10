import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

//Injectable - Este decorador é usado para marcar uma classe como um 
//serviço injetável no Nest.js. Os serviços são usados 
//para encapsular a lógica de negócios e podem ser injetados em controladores, outros serviços, etc.

//Agora ele é um provider, com isso sera criado o objeto de forma automática
@Injectable()
export class UserRepository{
    private users: UserEntity[] = [];

    async save(user: UserEntity){
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

    //recebe o id e um parcial de user entity
    async update(id: string, updateData: Partial<UserEntity>){

        const findUser = this.users.find(
            userSaved => userSaved.id === id
        );
        if(!findUser){
            throw new Error('User dont exists.');
        }
        Object.entries(updateData).forEach(([key, value]) => {
            if(key === id){
                return;
            };
            findUser[key] = value;
        });
        return findUser;

    }
}