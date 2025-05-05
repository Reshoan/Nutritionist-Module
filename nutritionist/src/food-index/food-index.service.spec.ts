import { Test, TestingModule } from '@nestjs/testing';
import { FoodIndexService } from './food-index.service';

describe('FoodIndexService', () => {
  let service: FoodIndexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodIndexService],
    }).compile();

    service = module.get<FoodIndexService>(FoodIndexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
