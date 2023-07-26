import { Injectable } from '@nestjs/common';
import { CreateDocxDto } from './dto/create-docx.dto';
import { UpdateDocxDto } from './dto/update-docx.dto';
// import { generateBlobDocxCenario } from '../../lib/createDocx.js';

@Injectable()
export class DocxService {
  createDocxBlob(createDocxDto: CreateDocxDto) {
    // const blob = generateBlobDocxCenario(createDocxDto);
    // return blob;
  }
}
