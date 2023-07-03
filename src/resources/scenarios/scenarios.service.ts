import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ScenariosService {
  constructor(@InjectModel('Scenario') private scenarioModel: Model<any>) {}

  async create(createScenarioDto: CreateScenarioDto) {
    try {
      const alreadyExists = await this.scenarioModel.find({
        sprint: createScenarioDto.sprint,
        cardNumber: createScenarioDto.cardNumber,
      });

      if (alreadyExists.length > 0) {
        return this.scenarioModel.updateOne(
          {
            sprint: createScenarioDto.sprint,
            cardNumber: createScenarioDto.cardNumber,
          },
          createScenarioDto,
        );
      }

      const createdScenario = await this.scenarioModel.create(
        createScenarioDto,
      );
      return createdScenario;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const scenarios = await this.scenarioModel.find();
      return scenarios;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: any) {
    try {
      const scenario = await this.scenarioModel.findById(id);
      return scenario;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findBySprint(sprint: string) {
    try {
      const scenarios = await this.scenarioModel.find({ sprint: sprint });
      if (!scenarios) {
        throw new NotFoundException('No scenarios found for this sprint');
      }
      return scenarios;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateScenarioDto: UpdateScenarioDto) {
    return `This action updates a #${id} scenario`;
  }

  remove(id: number) {
    return `This action removes a #${id} scenario`;
  }
}
