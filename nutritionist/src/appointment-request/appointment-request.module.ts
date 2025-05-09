import { Module } from '@nestjs/common';
import { AppointmentRequestService } from './appointment-request.service';
import { AppointmentRequestController } from './appointment-request.controller';

@Module({
  controllers: [AppointmentRequestController],
  providers: [AppointmentRequestService],
})
export class AppointmentRequestModule {}
