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

    private searchForId(id: string){
        const findUser = this.users.find(
            userSaved => userSaved.id === id
        );
        if(!findUser){
            throw new Error('User dont exists.');
        }
        return findUser;
    }
    //recebe o id e um parcial de user entity
    async update(id: string, updateData: Partial<UserEntity>){
        const user = this. searchForId(id);
        Object.entries(updateData).forEach(([key, value]) => {
            if(key === id){
                return;
            };
            user[key] = value;
        });
        return user;

    }

    async remove(id:string){
        const user = this. searchForId(id);
        this.users = this.users.filter(
            userSaved => userSaved.id !==id
            );
        return user;
    }
}