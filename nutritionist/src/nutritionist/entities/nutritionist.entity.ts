import { Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { AppointmentRequest } from 'src/appointment-request/entities/appointment-request.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Entity('nutritionists')
export class Nutritionist {
  @PrimaryColumn('uuid') // <- Uses user.id directly
  nutritionistId: string;

  @OneToOne(() => User, user => user.nutritionistProfile, { cascade: true })
  @JoinColumn({ name: 'nutritionistId' }) // <-- Ensures nutritionistId = user.id
  user: User;

  @OneToMany(() => AppointmentRequest, request => request.nutritionist)
  receivedRequests: AppointmentRequest[];

  @OneToMany(() => Appointment, appointment => appointment.nutritionist)
  appointments: Appointment[];
}
