import { Module } from '@nestjs/common';
import { ScenariosModule } from './resources/scenarios/scenarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    ScenariosModule,
    MongooseModule.forRoot(
      'mongodb+srv://rafael:rafael@cluster0.sziajsw.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
