import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NutritionistService } from './nutritionist.service';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AppointmentRequestService } from 'src/appointment-request/appointment-request.service'; // Assuming this is the path to the appointment request service
import { RequestStatus } from 'src/appointment-request/entities/appointment-request.entity'; // Assuming this is the path to the RequestStatus enum

@Controller('nutritionist')
export class NutritionistController {
  constructor(
    private readonly nutritionistService: NutritionistService,
    private readonly appointmentRequestService: AppointmentRequestService, // Injecting the appointment request service
  ) {}

  @Post()
  create(@Body() createNutritionistDto: CreateNutritionistDto) {
    return this.nutritionistService.create(createNutritionistDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLIENT')
  @Get('available')
  getAvailableNutritionists() {
    return this.nutritionistService.findAllAvailable();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('NUTRITIONIST')
  @Get('appointment-requests/:nutritionistId')
  async getAppointmentRequests(@Param('nutritionistId') nutritionistId: string) {
    return this.nutritionistService.getAppointmentRequests(nutritionistId);
  }

  @Patch('appointment-requests/:requestId/approve')
  async approveAppointmentRequest(@Param('requestId') requestId: string) {
    return this.nutritionistService.updateAppointmentRequestStatus(requestId, RequestStatus.APPROVED);
  }

  @Patch('appointment-requests/:requestId/reject')
  async rejectAppointmentRequest(@Param('requestId') requestId: string) {
    return this.nutritionistService.updateAppointmentRequestStatus(requestId, RequestStatus.REJECTED);
  }


  @Get()
  findAll() {
    return this.nutritionistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutritionistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNutritionistDto: UpdateNutritionistDto) {
    return this.nutritionistService.update(+id, updateNutritionistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutritionistService.remove(+id);
  }
}
