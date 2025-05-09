import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { NutritionistModule } from './nutritionist/nutritionist.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), NutritionistModule, AppointmentModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
