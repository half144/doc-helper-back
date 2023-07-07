import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/resources/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: any) {
    try {
      const user = await this.userServices.findUserByUserName(
        loginDto.username,
      );

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const isCorrectPassword = user.password === loginDto.password;
      if (!isCorrectPassword) {
        throw new UnauthorizedException('Wrong password');
      }

      const payload = {
        username: user.username,
        sub: user._id,
        fullname: user.fullname,
        roles: user.roles,
      };
      return {
        ...payload,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async register(registerDto: any) {
    try {
      const user = await this.userServices.createUser(registerDto);
      const payload = { username: user.username, sub: user._id };
      return {
        username: user.username,
        roles: user.roles,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
