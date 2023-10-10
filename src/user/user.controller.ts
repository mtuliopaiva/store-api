import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import {v4 as uuid} from 'uuid';


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
        return {id: userEntity.id, message: 'User created with success!'};
    }

    @Get()
    async listUsers(){
        return this.userRepository.list();
    }
}