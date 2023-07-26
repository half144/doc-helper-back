import { Module } from '@nestjs/common';
import { DocxService } from './docx.service';
import { DocxController } from './docx.controller';

@Module({
  controllers: [DocxController],
  providers: [DocxService]
})
export class DocxModule {}
