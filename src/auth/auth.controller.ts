import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    return await this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: any) {
    return await this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@Request() req: any) {
    return req.user;
  }
}
