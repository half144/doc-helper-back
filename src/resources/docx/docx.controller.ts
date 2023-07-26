import { Controller, Post, Body } from '@nestjs/common';
import { DocxService } from './docx.service';
import { CreateDocxDto } from './dto/create-docx.dto';

@Controller('docx')
export class DocxController {
  constructor(private readonly docxService: DocxService) {}

  @Post()
  create(@Body() createDocxDto: CreateDocxDto) {
    const blob = this.docxService.createDocxBlob(createDocxDto);
    return blob;
  }
}
