import { Test, TestingModule } from '@nestjs/testing';
import { DocxController } from './docx.controller';
import { DocxService } from './docx.service';

describe('DocxController', () => {
  let controller: DocxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocxController],
      providers: [DocxService],
    }).compile();

    controller = module.get<DocxController>(DocxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
