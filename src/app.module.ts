import { Module } from '@nestjs/common';
import { ScenariosModule } from './resources/scenarios/scenarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { ProjectsModule } from './resources/projects/projects.module';
import { DocxModule } from './resources/docx/docx.module';

@Module({
  imports: [
    ScenariosModule,
    MongooseModule.forRoot(
      'mongodb+srv://rafael:rafael@cluster0.sziajsw.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
    ProjectsModule,
    DocxModule,
  ],
})
export class AppModule {}
