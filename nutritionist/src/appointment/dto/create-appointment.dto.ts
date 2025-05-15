// src/appointment/dto/create-appointment.dto.ts

import { IsUUID, IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  appointmentDateTime: string;

  @IsString()
  meetLink: string;

  @IsUUID()
  requestId: string;
}
