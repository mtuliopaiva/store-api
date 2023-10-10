import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import {v4 as uuid} from 'uuid';
import { ListUserDTO } from "./dto/list-user.dto";
import { UpdateUserDTo } from "./dto/update-user.dto";


@Controller('/users')
export class UserController {

    constructor(private userRepository: UserRepository) {}

    @Post()
    async createUser(@Body() dataUser:CreateUserDTO) {
        const userEntity = new UserEntity();
        userEntity.email = dataUser.email;
        userEntity.password = dataUser.password;
        userEntity.name = dataUser.name;
        userEntity.id = uuid();

        this.userRepository.save(userEntity);
        return {
            user: new ListUserDTO(userEntity.id, userEntity.name), 
            message: 'User created with success!'
        };
    }

    @Get()
    async listUsers(){
        const usersSaved = await this.userRepository.list();
        const usersList = usersSaved.map(
            user => new ListUserDTO(
                user.id,
                user.name
            )
        );

        return usersList;
    }

    //Informamos a rota e o local onde é para pegar que no caso é a url - Param
    @Put('/:id')
    async updateUser (@Param('id') id: string, @Body() dataUpdate: UpdateUserDTo ) {
        const userUpdate = await this.userRepository.update(id, dataUpdate);

        return{
            user: userUpdate,
            message:'User updated with success.'
        }
    }
    @Delete('/:id')
    async deleteUser(@Param('id') id: string){
    const userDeleted = await this.userRepository.remove(id);

    return{
        user: userDeleted,
        message: 'User deleted with success.'
    }
}
}