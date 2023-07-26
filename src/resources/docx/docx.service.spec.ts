import { Test, TestingModule } from '@nestjs/testing';
import { DocxService } from './docx.service';

describe('DocxService', () => {
  let service: DocxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocxService],
    }).compile();

    service = module.get<DocxService>(DocxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
