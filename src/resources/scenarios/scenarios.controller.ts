import { Controller, Get, Param, Delete, Req } from '@nestjs/common';
import { ScenariosService } from './scenarios.service';

@Controller('scenarios')
export class ScenariosController {
  constructor(private readonly scenariosService: ScenariosService) {}

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.scenariosService.findOne(id);
  }
}
