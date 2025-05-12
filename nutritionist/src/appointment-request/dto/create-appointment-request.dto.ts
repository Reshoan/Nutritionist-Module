import { IsUUID, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentRequestDto {
  @IsUUID()
  nutritionistId: string;

  @IsDateString()
  preferredDateTime: string; // ✅ Change this from Date to string

  @IsOptional()
  @IsString()
  message?: string;
}
