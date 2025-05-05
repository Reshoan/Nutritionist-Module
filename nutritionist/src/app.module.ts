import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { NutritionistsModule } from './nutritionists/nutritionists.module';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { BlogsModule } from './blogs/blogs.module';
import { MailsModule } from './mails/mails.module';
import { ProgressTrackingModule } from './progress-tracking/progress-tracking.module';
import { FoodIndexModule } from './food-index/food-index.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), NutritionistsModule, UsersModule, AppointmentsModule, BlogsModule, MailsModule, ProgressTrackingModule, FoodIndexModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
