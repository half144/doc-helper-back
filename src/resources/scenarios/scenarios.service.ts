import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ScenariosService {
  constructor(@InjectModel('Scenario') private scenarioModel: Model<any>) {}

  async create(
    createScenarioDto: CreateScenarioDto,
    user: any,
    projectId: string,
  ) {
    try {
      const alreadyExists = await this.scenarioModel.find({
        sprint: createScenarioDto.sprint,
        cardNumber: createScenarioDto.cardNumber,
      });

      if (alreadyExists.length > 0 && alreadyExists[0].createdBy != user.sub) {
        throw new ForbiddenException(
          'Esse cenário já existe e não foi criado por você.',
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

        const updatedScenario = await this.scenarioModel.findOne({
          sprint: createScenarioDto.sprint,
          cardNumber: createScenarioDto.cardNumber,
        });

        return updatedScenario;
      }

      const createdScenario = await this.scenarioModel.create({
        ...createScenarioDto,
        createdBy: user.sub,
        projectId,
      });

      console.log({ createdScenario });

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

  async remove(id: string, user: any) {
    try {
      const scenario = await this.scenarioModel.findByIdAndDelete(id);

      if (!scenario) {
        throw new NotFoundException('Scenario not found');
      }

      return {
        message: `Scenario ${scenario.cardNumber} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
