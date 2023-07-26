import { PartialType } from '@nestjs/mapped-types';
import { CreateDocxDto } from './create-docx.dto';

export class UpdateDocxDto extends PartialType(CreateDocxDto) {}
