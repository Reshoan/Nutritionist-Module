import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentRequestDto } from './dto/create-appointment-request.dto';
import { UpdateAppointmentRequestDto } from './dto/update-appointment-request.dto';
import { AppointmentRequest } from './entities/appointment-request.entity';
import { Client } from 'src/client/entities/client.entity';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';

@Injectable()
export class AppointmentRequestService {
  constructor(
    @InjectRepository(AppointmentRequest)
    private appointmentRequestRepo: Repository<AppointmentRequest>,
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
    @InjectRepository(Nutritionist)
    private nutritionistRepo: Repository<Nutritionist>,
  ) {}

  async create(clientEmail: string, dto: CreateAppointmentRequestDto): Promise<AppointmentRequest> {
    const client = await this.clientRepo.findOne({
      where: { user: { email: clientEmail } },
      relations: ['user'],
    });

    if (!client) throw new NotFoundException('Client not found');

    const nutritionist = await this.nutritionistRepo.findOne({
      where: { nutritionistId: dto.nutritionistId },
      relations: ['user'],
    });

    if (!nutritionist) throw new NotFoundException('Nutritionist not found');

    const appointment = this.appointmentRequestRepo.create({
      client,
      nutritionist,
      preferredDateTime: dto.preferredDateTime,
      message: dto.message,
    });

    return await this.appointmentRequestRepo.save(appointment);
  }

  async findAll(): Promise<AppointmentRequest[]> {
    return this.appointmentRequestRepo.find({
      relations: ['client', 'nutritionist'],
      order: { requestedAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<AppointmentRequest> {
    const request = await this.appointmentRequestRepo.findOne({
      where: { requestId: id },
      relations: ['client', 'nutritionist'],
    });

    if (!request) throw new NotFoundException('Appointment Request not found');
    return request;
  }

  async update(id: string, dto: UpdateAppointmentRequestDto): Promise<AppointmentRequest> {
    const request = await this.findOne(id);
    Object.assign(request, dto);
    return this.appointmentRequestRepo.save(request);
  }

  async remove(id: string): Promise<{ message: string }> {
    const request = await this.findOne(id);
    await this.appointmentRequestRepo.remove(request);
    return { message: 'Appointment Request deleted successfully' };
  }
}