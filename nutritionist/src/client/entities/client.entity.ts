import { Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { AppointmentRequest } from 'src/appointment-request/entities/appointment-request.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Entity('clients')
export class Client {
  @PrimaryColumn('uuid') // <- No longer auto-generates, uses user.id
  clientId: string;

  @OneToOne(() => User, user => user.clientProfile, { cascade: true })
  @JoinColumn({ name: 'clientId' }) // <-- This ensures clientId = user.id
  user: User;

  @OneToMany(() => AppointmentRequest, request => request.client)
  appointmentRequests: AppointmentRequest[];

  @OneToMany(() => Appointment, appointment => appointment.client)
  appointments: Appointment[];
}
