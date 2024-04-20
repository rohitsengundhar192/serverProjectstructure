import { Test, TestingModule } from '@nestjs/testing';
import { UplaodFileMasterService } from './wow-gallery.service';

describe('UplaodFileMasterService', () => {
  let service: UplaodFileMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UplaodFileMasterService],
    }).compile();

    service = module.get<UplaodFileMasterService>(UplaodFileMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
