import { Test, TestingModule } from '@nestjs/testing';
import { UploadFileMasterController } from './wow-gallery.controller';

describe('UploadFileMasterController', () => {
  let controller: UploadFileMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadFileMasterController],
    }).compile();

    controller = module.get<UploadFileMasterController>(UploadFileMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
