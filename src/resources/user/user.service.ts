import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  async findUserByUserName(username: string) {
    try {
      const user = await this.userModel.findOne({ username });
      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createUser(user: any) {
    try {
      const newUser = await this.userModel.create(user);
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
