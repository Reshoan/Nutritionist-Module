import { Test, TestingModule } from '@nestjs/testing';
import { FoodIndexController } from './food-index.controller';
import { FoodIndexService } from './food-index.service';

describe('FoodIndexController', () => {
  let controller: FoodIndexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodIndexController],
      providers: [FoodIndexService],
    }).compile();

    controller = module.get<FoodIndexController>(FoodIndexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
