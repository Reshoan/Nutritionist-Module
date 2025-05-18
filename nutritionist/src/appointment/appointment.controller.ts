import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('NUTRITIONIST')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post(':id/accept')
async acceptRequest(
  @Param('id') requestId: string,
  @Body('appointmentDateTime') appointmentDateTime?: string,
) {
  return this.appointmentService.create(requestId, appointmentDateTime);
}

}
