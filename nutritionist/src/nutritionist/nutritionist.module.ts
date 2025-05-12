import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionistService } from './nutritionist.service';
import { Nutritionist } from './entities/nutritionist.entity';
import { NutritionistController } from './nutritionist.controller';
import { UserModule } from 'src/user/user.module'; // If you need user info
import { AppointmentRequest } from 'src/appointment-request/entities/appointment-request.entity';
import { AppointmentRequestModule } from 'src/appointment-request/appointment-request.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nutritionist, AppointmentRequest]), 
    UserModule, AppointmentRequestModule
  ],
  providers: [NutritionistService],
  controllers: [NutritionistController],
})
export class NutritionistModule {}
