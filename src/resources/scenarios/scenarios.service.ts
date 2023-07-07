import {
  BadRequestException,
  ForbiddenException,
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

  async create(createScenarioDto: CreateScenarioDto, user: any) {
    try {
      const alreadyExists = await this.scenarioModel.find({
        sprint: createScenarioDto.sprint,
        cardNumber: createScenarioDto.cardNumber,
      });

      if (alreadyExists.length > 0 && alreadyExists[0].createdBy != user.sub) {
        throw new ForbiddenException(
          'This scenario already exists and is being reviewed by another user',
        );
      }

      if (alreadyExists.length > 0 && alreadyExists[0].createdBy == user.sub) {
        await this.scenarioModel.updateOne(
          {
            sprint: createScenarioDto.sprint,
            cardNumber: createScenarioDto.cardNumber,
          },
          createScenarioDto,
        );
        return {
          message: `Scenario ${createScenarioDto.cardNumber} updated successfully`,
        };
      }

      const createdScenario = await this.scenarioModel.create({
        ...createScenarioDto,
        createdBy: user.sub,
      });
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

  async remove(id: string) {
    try {
      const scenario = await this.scenarioModel.findByIdAndDelete(id);
      return {
        message: `Scenario ${scenario.cardNumber} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
