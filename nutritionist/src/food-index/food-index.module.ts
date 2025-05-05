import { Module } from '@nestjs/common';
import { FoodIndexService } from './food-index.service';
import { FoodIndexController } from './food-index.controller';

@Module({
  controllers: [FoodIndexController],
  providers: [FoodIndexService],
})
export class FoodIndexModule {}
