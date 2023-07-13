import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/resources/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsModule } from 'src/resources/projects/projects.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    ProjectsModule,
    JwtModule.register({
      global: true,
      secret: 'notsecuresecretkey',
    }),
  ],
})
export class AuthModule {}
