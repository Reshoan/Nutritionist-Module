import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionistsService } from './nutritionists.service';
import { NutritionistEntity } from './entities/nutritionist.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NutritionistEntity, UserEntity])],
  providers: [NutritionistsService],
  exports: [NutritionistsService],
})
export class NutritionistsModule {}
