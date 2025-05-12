// src/appointment/dto/create-appointment.dto.ts

import { IsUUID, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  clientId: string;

  @IsUUID()
  nutritionistId: string;

  @IsDateString()
  appointmentDateTime: string;

  @IsString()
  meetLink: string;

  @IsOptional()
  @IsUUID()
  requestId?: string;
}
