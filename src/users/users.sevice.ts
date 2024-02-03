import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { SavePassword } from 'src/savePassword/SavePassword';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // save password
  buildUserResponse(user: User): SavePassword {
    return {
      fullName: user.fullName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      token: this.generateJwt(user),
    };
  }

  generateJwt(user: User): string {
    return sign({ email: user.email }, 'secret123');
  }

  // register
  register(CreateUserDto: CreateUserDto) {
    const user = new this.userModel(CreateUserDto);
    return user.save();
  }

  // login
  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email }).select('+password');
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordCorrect = await compare(loginUserDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException('Password is not correct', 400);
    }

    // save password
    return this.buildUserResponse(user);
  }

  // delete user
  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return 'User has been deleted';
  }

  // delete user
  async getAllUsers() {
    // const users = this.userModel.aggregate([{ $sample: { size: 100 } }]); brings a random list of users
    const users = this.userModel.find();
    return users;
  }

  // find by email its for middlewar
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  // find by ID
  async findUserById(id: number) {
    const user = this.userModel.findById(id);
    return user;
  }

  // update user
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return 'User updated';
  }
}
