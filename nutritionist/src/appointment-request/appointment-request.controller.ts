import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentRequestService } from './appointment-request.service';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { UpdateAppointmentRequestDto } from './dto/update-appointment-request.dto';

@Controller('appointment-request')
export class AppointmentRequestController {
  constructor(private readonly appointmentRequestService: AppointmentRequestService) {}

  @Post()
  create(@Body() createAppointmentRequestDto: CreateAppointmentRequestDto) {
    return this.appointmentRequestService.create(createAppointmentRequestDto);
  }

  @Get()
  findAll() {
    return this.appointmentRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentRequestDto: UpdateAppointmentRequestDto) {
    return this.appointmentRequestService.update(+id, updateAppointmentRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentRequestService.remove(+id);
  }
}
