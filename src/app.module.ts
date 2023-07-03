import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScenariosModule } from './resources/scenarios/scenarios.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ScenariosModule,
    MongooseModule.forRoot(
      'mongodb+srv://rafael:rafael@cluster0.sziajsw.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
