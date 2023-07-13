import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateScenarioDto } from '../scenarios/dto/create-scenario.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
    return this.projectsService.create(createProjectDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Post(':id/member')
  addMember(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.addMember(id, body);
  }

  @UseGuards(AuthGuard)
  @Post(':id/cards')
  addCard(
    @Param('id') id: string,
    @Body() body: CreateScenarioDto,
    @Req() req: any,
  ) {
    return this.projectsService.addCard(id, body, req.user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.findOne(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.deleteProject(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/cards/:cardId')
  removeCard(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
    @Req() req: any,
  ) {
    return this.projectsService.removeCard(id, cardId, req.user);
  }

  @UseGuards(AuthGuard)
  @Post('invite/:id')
  createInvite(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.createInvite(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Get('invite/:inviteToken')
  acceptInvite(@Param('inviteToken') inviteToken: string, @Req() req: any) {
    return this.projectsService.acceptInvitation(inviteToken, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete('exit/:id')
  exitProject(@Param('id') id: string, @Req() req: any) {
    return this.projectsService.exitProject(id, req.user);
  }
}
