import { Injectable } from '@nestjs/common';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { UpdateAppointmentRequestDto } from './dto/update-appointment-request.dto';

@Injectable()
export class AppointmentRequestService {
  create(createAppointmentRequestDto: CreateAppointmentRequestDto) {
    return 'This action adds a new appointmentRequest';
  }

  findAll() {
    return `This action returns all appointmentRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointmentRequest`;
  }

  update(id: number, updateAppointmentRequestDto: UpdateAppointmentRequestDto) {
    return `This action updates a #${id} appointmentRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointmentRequest`;
  }
}
