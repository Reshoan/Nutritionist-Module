import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AppointmentRequestService } from './appointment-request.service';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { UpdateAppointmentRequestDto } from './dto/update-appointment-request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Request } from 'express';

@Controller('appointment-request')
export class AppointmentRequestController {
  constructor(private readonly appointmentRequestService: AppointmentRequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateAppointmentRequestDto, @Req() req: Request) {
    if (!req.user || !req.user['email']) {
  throw new UnauthorizedException('User not authenticated');
}
const clientEmail = req.user['email'];
    return this.appointmentRequestService.create(clientEmail, dto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id/status')
  async getStatusForClient(@Param('id') requestId: string, @Req() req: Request) {
    if (!req.user || !req.user['email']) {
      throw new UnauthorizedException('User not authenticated');
    }

    const clientEmail = req.user['email'];
    return this.appointmentRequestService.getStatusForClient(clientEmail, requestId);
  }
  @Get()
  findAll() {
    return this.appointmentRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentRequestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentRequestDto) {
    return this.appointmentRequestService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentRequestService.remove(id);
  }
}
