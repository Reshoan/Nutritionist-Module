import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Client } from 'src/client/entities/client.entity';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';
import { AppointmentRequest, RequestStatus } from 'src/appointment-request/entities/appointment-request.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Nutritionist)
    private readonly nutritionistRepository: Repository<Nutritionist>,
    @InjectRepository(AppointmentRequest)
    private readonly appointmentRequestRepository: Repository<AppointmentRequest>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { clientId, nutritionistId, appointmentDateTime, meetLink, requestId } = createAppointmentDto;

    const client = await this.clientRepository.findOne({ where: { clientId } });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const nutritionist = await this.nutritionistRepository.findOne({ where: { nutritionistId } });
    if (!nutritionist) {
      throw new NotFoundException('Nutritionist not found');
    }

    let appointmentRequest: AppointmentRequest | null = null;
    if (requestId) {
      appointmentRequest = await this.appointmentRequestRepository.findOne({ where: { requestId } });
      if (!appointmentRequest) {
        throw new NotFoundException('Appointment request not found');
      }
      appointmentRequest.status = RequestStatus.APPROVED;
      await this.appointmentRequestRepository.save(appointmentRequest);
    }

    const appointment = this.appointmentRepository.create({
      appointmentDateTime,
      meetLink,
      client,
      nutritionist,
      request: appointmentRequest ?? undefined,
    });

    return this.appointmentRepository.save(appointment);
  }
}
