import { Module } from '@nestjs/common';
import { ScenariosService } from './scenarios.service';
import { ScenariosController } from './scenarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScenarioSchema } from './entities/scenario.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Scenario', schema: ScenarioSchema }]),
  ],
  controllers: [ScenariosController],
  providers: [ScenariosService],
  exports: [ScenariosService],
})
export class ScenariosModule {}
