import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ScenariosService } from './scenarios.service';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('scenarios')
export class ScenariosController {
  constructor(private readonly scenariosService: ScenariosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createScenarioDto: CreateScenarioDto, @Request() req: any) {
    return this.scenariosService.create(createScenarioDto, req.user);
  }

  @Get()
  findAll() {
    return this.scenariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.scenariosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScenarioDto: UpdateScenarioDto,
  ) {
    return this.scenariosService.update(+id, updateScenarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scenariosService.remove(id);
  }

  @Get('/sprint/:sprint')
  getBySprint(@Param('sprint') sprint: string) {
    return this.scenariosService.findBySprint(sprint);
  }
}
