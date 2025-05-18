import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentRequest, RequestStatus } from 'src/appointment-request/entities/appointment-request.entity';
import { Client } from 'src/client/entities/client.entity';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';
import { MailService } from 'src/mail/mail.service';
import * as moment from 'moment';
import { AppointmentStatus } from '../appointment/entities/appointment.entity';

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

    private readonly mailService: MailService,
  ) {}

 async create(requestId: string, appointmentDateTime?: string) {
  const appointmentRequest = await this.appointmentRequestRepository.findOne({
    where: { requestId },
    relations: ['client', 'nutritionist', 'client.user', 'nutritionist.user'],
  });

  if (!appointmentRequest) {
    throw new NotFoundException('Appointment Request not found');
  }

  const dateTime = appointmentDateTime
    ? moment(appointmentDateTime)
    : moment(appointmentRequest.preferredDateTime);

  const clientEmail = appointmentRequest.client.user.email;
  const nutritionistEmail = appointmentRequest.nutritionist.user.email;

  // Save Appointment
  const appointment = this.appointmentRepository.create({
    appointmentDateTime: dateTime.toDate(),
    nutritionist: appointmentRequest.nutritionist,
    client: appointmentRequest.client,
    request: appointmentRequest,
    status: AppointmentStatus.UPCOMING,
    emailSent: false,
  });

  await this.appointmentRepository.save(appointment);

  // Update Request Status
  appointmentRequest.status = RequestStatus.APPROVED;
  await this.appointmentRequestRepository.save(appointmentRequest);

  // Prepare email content
  const appointmentDateFormatted = dateTime.format('LLLL'); // e.g., Sunday, May 17, 2025 3:00 PM
  const subject = 'Appointment Confirmation';
  const htmlContent = `
    <p>Dear ${appointmentRequest.client.user.name} and ${appointmentRequest.nutritionist.user.name},</p>
    <p>Your appointment has been scheduled successfully.</p>
    <ul>
      <li><strong>Appointment ID:</strong> ${appointment.appointmentId}</li>
      <li><strong>Date & Time:</strong> ${appointmentDateFormatted}</li>
      <li><strong>Client:</strong> ${appointmentRequest.client.user.name} (${clientEmail})</li>
      <li><strong>Nutritionist:</strong> ${appointmentRequest.nutritionist.user.name} (${nutritionistEmail})</li>
    </ul>
    <p>Thank you!</p>
  `;

  // Send email to client
  await this.mailService.sendMail({
    recipient: [clientEmail],
    subject,
    html: htmlContent,
  });

  // Send email to nutritionist
  await this.mailService.sendMail({
    recipient: [nutritionistEmail],
    subject,
    html: htmlContent,
  });

  // Mark email as sent
  appointment.emailSent = true;
  await this.appointmentRepository.save(appointment);

  // Return details
  return {
    appointmentId: appointment.appointmentId,
    appointmentDateTime: dateTime.toISOString(),
  };
}

}
