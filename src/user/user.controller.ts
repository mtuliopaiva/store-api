import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import {v4 as uuid} from 'uuid';
import { ListUserDTO } from "./dto/list-user.dto";


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
            message: 'User created with success!'};
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
}