import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';
import { Client } from 'src/client/entities/client.entity';
import { AppointmentRequest } from 'src/appointment-request/entities/appointment-request.entity';

export enum AppointmentStatus {
  UPCOMING = 'upcoming',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  appointmentId: string;

  @Column({ type: 'timestamp' })
  appointmentDateTime: Date;

  @Column()
  meetLink: string;

  @Column({ default: false })
  emailSent: boolean;

  @Column({ type: 'enum', enum: AppointmentStatus, default: AppointmentStatus.UPCOMING })
  status: AppointmentStatus;

  @ManyToOne(() => Nutritionist)
  @JoinColumn({ name: 'nutritionistId' })
  nutritionist: Nutritionist;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => AppointmentRequest, { nullable: true, eager: true })
  @JoinColumn({ name: 'requestId' })
  request: AppointmentRequest;
}
