import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScenariosService } from '../scenarios/scenarios.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private projectModel: Model<CreateProjectDto>,
    private scenariosService: ScenariosService,
    private jwtService: JwtService,
  ) {}

  async create(createProjectDto: CreateProjectDto, user: any) {
    try {
      const owner = user.sub;
      const project = await this.projectModel.create({
        ...createProjectDto,
        projectOwner: owner,
        projectMembers: [owner],
      });

      return project;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string, user: any) {
    try {
      const project = await this.projectModel.findById(id);
      if (!project) {
        throw new NotFoundException('Projeto não encontrado');
      }

      const members = project.projectMembers;
      const isMember = members.includes(user.sub);
      if (!isMember) {
        const { projectName, projectDescription, projectMembers, _id } =
          project;
        return { projectName, projectDescription, projectMembers, _id };
      }

      return project;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addMember(id: string, body: any) {
    try {
      const project = await this.projectModel.findById(id);
      if (!project) {
        throw new NotFoundException('Projeto não encontrado');
      }

      const members = [...project.projectMembers, body.member];
      const updatedProject = await this.projectModel.findByIdAndUpdate(
        id,
        {
          projectMembers: members,
        },
        { new: true },
      );
      return updatedProject;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addDeveloper(id: string, body: any) {
    try {
      const project = await this.projectModel.findById(id);
      if (!project) {
        throw new NotFoundException('Projeto não encontrado');
      }

      const developers = [...project.developers, body.developer];
      const updatedProject = await this.projectModel.findByIdAndUpdate(
        id,
        {
          developers,
        },
        { new: true },
      );
      return updatedProject;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addCard(id: string, body: any, user: any) {
    try {
      const project = await this.projectModel.findById(id);
      if (!project) {
        throw new NotFoundException('Projeto não encontrado');
      }

      const members = project.projectMembers;
      const isMember = members.includes(user.sub);
      if (!isMember) {
        throw new UnauthorizedException(
          'Você não tem permissão para adicionar um card a este projeto',
        );
      }

      const scenario = await this.scenariosService.create(body, user, id);

      const cardExists = !!project.cards.find(
        (card) => card?._id.toString() === scenario?._id.toString(),
      );

      const updatedScenarios = cardExists
        ? project.cards.map((card) =>
            card?._id.toString() === scenario?._id.toString() ? scenario : card,
          )
        : [...project.cards, scenario];

      await this.projectModel.findByIdAndUpdate(
        id,
        {
          cards: updatedScenarios,
        },
        { new: true },
      );

      return await this.projectModel.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteProject(id: string, user: any) {
    try {
      const project = await this.projectModel.findById(id);
      if (!project) {
        throw new NotFoundException('Projeto não encontrado');
      }

      const isOwner = project.projectOwner === user.sub;
      if (!isOwner) {
        throw new UnauthorizedException(
          'Você não tem permissão para remover este projeto',
        );
      }

      await this.projectModel.findByIdAndDelete(id);
      return { message: 'Projeto removido com sucesso' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeCard(id: string, cardId: string, user: any) {
    try {
      const project = await this.projectModel.findById(id);
      const members = project.projectMembers;
      const isMember = members.includes(user.sub);
      if (!isMember) {
        throw new UnauthorizedException(
          'Você não tem permissão para remover um card deste projeto',
        );
      }

      const scenarios = project.cards;
      const updatedScenarios = scenarios.filter(
        (scenario) => scenario._id != cardId,
      );
      const updatedProject = await this.projectModel.findByIdAndUpdate(
        id,
        {
          projectScenarios: updatedScenarios,
        },
        { new: true },
      );
      return updatedProject;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findProjectsByUserId(userId: any) {
    try {
      const projects = await this.projectModel.find({
        projectMembers: { $in: [userId.toString()] },
      });

      return projects ?? [];
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createInvite(id: string, user: any) {
    try {
      const project = await this.projectModel.findById(id);
      const members = project.projectMembers;
      const isMember = members.includes(user.sub);
      if (!isMember) {
        throw new UnauthorizedException(
          'Você não tem permissão para convidar um membro para este projeto',
        );
      }

      const token = this.jwtService.sign({ projectId: id });
      return { inviteToken: token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async acceptInvitation(inviteToken: string, user: any) {
    try {
      const projectPayload: any = this.jwtService.decode(inviteToken);

      const project = await this.projectModel.findById(
        projectPayload.projectId,
      );
      const members = project.projectMembers;
      const isMember = members.includes(user.sub);
      if (isMember) {
        throw new BadRequestException('Você já é membro deste projeto');
      }

      await this.addMember(projectPayload.projectId, { member: user.sub });

      return { message: 'Convite aceito com sucesso' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async exitProject(id: string, user: any) {
    try {
      const project = await this.projectModel.findById(id);
      const members = project.projectMembers;
      const isMember = members.includes(user.sub);
      if (!isMember) {
        throw new UnauthorizedException(
          'Você não tem permissão para sair deste projeto',
        );
      }

      const updatedMembers = members.filter((member) => member != user.sub);
      const updatedProject = await this.projectModel.findByIdAndUpdate(
        id,
        {
          projectMembers: updatedMembers,
        },
        { new: true },
      );
      return {
        message: 'Você saiu do projeto com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
