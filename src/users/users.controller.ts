import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('dashbord')
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ){}

}
