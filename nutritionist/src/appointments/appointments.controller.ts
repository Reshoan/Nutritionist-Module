import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentService) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(dto);
  }

  @Patch(':id/confirm')
  confirm(@Param('id') id: number) {
    return this.appointmentsService.confirmAppointment(+id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: number) {
    return this.appointmentsService.cancelAppointment(+id);
  }

  @Post(':id/send-email')
  sendEmail(@Param('id') id: number) {
    return this.appointmentsService.sendAppointmentEmailWithGoogleCalendar(+id);
  }

  @Get('nutritionist/:id')
  getByNutritionist(@Param('id') id: number) {
    return this.appointmentsService.getAppointmentsByNutritionist(+id);
  }

  @Get('client/:id')
  getByClient(@Param('id') id: number) {
    return this.appointmentsService.getAppointmentsByClient(+id);
  }


  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
