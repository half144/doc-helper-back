import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProjectsService } from 'src/resources/projects/projects.service';
import { UserService } from 'src/resources/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private projectsService: ProjectsService,
    private userServices: UserService,
    private jwtService: JwtService,
  ) { }

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

      const projects = await this.projectsService.findProjectsByUserId(
        user._id,
      );
      const payload = {
        username: user.username,
        sub: user._id,
        fullname: user.fullname,
        projects: projects,
      };

      return {
        ...payload,
        access_token: this.jwtService.sign({
          username: user.username,
          sub: user._id,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async register(registerDto: any) {
    try {
      const user = await this.userServices.createUser(registerDto);

      const projects = await this.projectsService.findProjectsByUserId(
        user._id,
      );
      const payload = {
        username: user.username,
        sub: user._id,
        fullname: user.fullname,
        projects: projects,
      };

      return {
        ...payload,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMe(user: any) {
    try {
      const projects = await this.projectsService.findProjectsByUserId(
        user.sub,
      );
      const payload = {
        username: user.username,
        sub: user.sub,
        fullname: user.fullname,
        projects: projects,
      };
      return payload;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
