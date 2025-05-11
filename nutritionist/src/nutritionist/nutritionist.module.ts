import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionistService } from './nutritionist.service';
import { Nutritionist } from './entities/nutritionist.entity';
import { NutritionistController } from './nutritionist.controller';
import { UserModule } from 'src/user/user.module'; // If you need user info

@Module({
  imports: [
    TypeOrmModule.forFeature([Nutritionist]), 
    UserModule,
  ],
  providers: [NutritionistService],
  controllers: [NutritionistController],
})
export class NutritionistModule {}
