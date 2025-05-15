import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentRequest, RequestStatus } from 'src/appointment-request/entities/appointment-request.entity';
import { Client } from 'src/client/entities/client.entity';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';

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
    const { appointmentDateTime, meetLink, requestId } = createAppointmentDto;

    // Step 1: Find appointment request
    const appointmentRequest = await this.appointmentRequestRepository.findOne({
      where: { requestId },
      relations: ['client', 'nutritionist'], // Ensure related entities are loaded
    });

    if (!appointmentRequest) {
      throw new NotFoundException('Appointment request not found');
    }

    // Step 2: Update request status to APPROVED
    appointmentRequest.status = RequestStatus.APPROVED;
    await this.appointmentRequestRepository.save(appointmentRequest);

    const { client, nutritionist } = appointmentRequest;

    // Step 3: Create and save appointment
    const appointment = this.appointmentRepository.create({
      appointmentDateTime,
      meetLink,
      client,
      nutritionist,
      request: appointmentRequest,
    });

    return this.appointmentRepository.save(appointment);
  }
}
