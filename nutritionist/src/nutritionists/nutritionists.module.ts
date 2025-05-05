import { Module } from '@nestjs/common';
import { NutritionistsService } from './nutritionists.service';
import { NutritionistsController } from './nutritionists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionistEntity } from './entities/nutritionist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NutritionistEntity])],
  controllers: [NutritionistsController],
  providers: [NutritionistsService],
})
export class NutritionistsModule {}
