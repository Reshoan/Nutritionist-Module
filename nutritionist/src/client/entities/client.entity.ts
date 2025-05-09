import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { AppointmentRequest } from 'src/appointment-request/entities/appointment-request.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Entity()
export class Client {
@PrimaryGeneratedColumn('uuid')
clientId: string;

@OneToOne(() => User, user => user.clientProfile, { cascade: true })
@JoinColumn()
user: User;

@OneToMany(() => AppointmentRequest, request => request.client)
appointmentRequests: AppointmentRequest[];

@OneToMany(() => Appointment, appointment => appointment.client)
appointments: Appointment[];
}