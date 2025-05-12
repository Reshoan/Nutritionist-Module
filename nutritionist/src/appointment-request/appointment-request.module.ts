import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRequestService } from './appointment-request.service';
import { AppointmentRequestController } from './appointment-request.controller';
import { AppointmentRequest } from './entities/appointment-request.entity';
import { Client } from 'src/client/entities/client.entity';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRequest, Client, Nutritionist])],
  controllers: [AppointmentRequestController],
  providers: [AppointmentRequestService],
  exports: [AppointmentRequestService], // Export if used elsewhere (optional)
})
export class AppointmentRequestModule {}
