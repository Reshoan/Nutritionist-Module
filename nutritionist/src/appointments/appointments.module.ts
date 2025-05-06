import { Module } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [AppointmentsController],
  providers: [AppointmentService],
})
export class AppointmentsModule {}
