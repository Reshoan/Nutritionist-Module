import { IsUUID, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentRequestDto {
  @IsUUID()
  nutritionistId: string;

  @IsDateString()
  preferredDateTime: Date;

  @IsOptional()
  @IsString()
  message?: string;
}
