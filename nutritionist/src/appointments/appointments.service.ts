import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentRepo: Repository<AppointmentEntity>
  ) {}

  async createAppointment(dto: CreateAppointmentDto): Promise<AppointmentEntity> {
    const appointment = this.appointmentRepo.create({
      client: { id: dto.clientId } as any,
      nutritionist: { id: dto.nutritionistId } as any,
      appointment_date: new Date(dto.appointmentDateTime),
    });
  
    return this.appointmentRepo.save(appointment);
  }

  async confirmAppointment(id: number): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepo.findOne({ where: { appointment_id: id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    appointment.status = 'confirmed';
    return this.appointmentRepo.save(appointment);
  }

  async cancelAppointment(id: number): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepo.findOne({ where: { appointment_id: id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    appointment.status = 'cancelled';
    return this.appointmentRepo.save(appointment);
  }

  async getAppointmentsByNutritionist(nutritionistId: number): Promise<AppointmentEntity[]> {
    return this.appointmentRepo.find({
      where: { nutritionist: { nutritionist_id: nutritionistId } },
      relations: ['client'],
    });
  }

  async getAppointmentsByClient(clientId: number): Promise<AppointmentEntity[]> {
    return this.appointmentRepo.find({
      where: { client: { client_id: clientId } },
      relations: ['nutritionist'],
    });
  }

  async sendAppointmentEmailWithGoogleCalendar(id: number): Promise<string> {
    // Placeholder logic — replace with actual Google Calendar + Mailer integration
    const appointment = await this.appointmentRepo.findOne({
      where: { appointment_id: id },
      relations: ['client', 'nutritionist'],
    });
    if (!appointment) throw new NotFoundException('Appointment not found');

    // Generate calendar link (mock)
    const calendarLink = `https://calendar.google.com/event?action=TEMPLATE&dates=...`;

    // Send email to client (use real mail service)
    // emailService.send(to, subject, content)

    return `Email sent with link: ${calendarLink}`;
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
