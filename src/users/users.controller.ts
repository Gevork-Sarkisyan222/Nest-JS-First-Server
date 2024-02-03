import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  Put,
  Delete,
  Request,
  Patch,
} from '@nestjs/common';
import { UserService } from './users.sevice';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { ExpressRequest } from 'src/middleware/auth';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
@ApiTags()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    const user = await this.userService.register(CreateUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    return user;
  }

  @Get('auth')
  async currentUser(@Request() request: ExpressRequest) {
    if (!request.user) {
      throw new HttpException('Unauthroized', 403);
    }

    return this.userService.buildUserResponse(request.user);
  }

  @Get('list')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    const deleteUser = await this.userService.deleteUser(id);
    return deleteUser;
  }

  @Get('find/:id')
  findUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
