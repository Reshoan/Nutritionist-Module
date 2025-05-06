// src/appointments/entities/appointment.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';
import { NutritionistEntity } from 'src/nutritionists/entities/nutritionist.entity';

@Entity('appointments')
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  appointment_id: number;

  @ManyToOne(() => ClientEntity, (client) => client.appointments, { nullable: false })
  client: ClientEntity;

  @ManyToOne(() => NutritionistEntity, (nutritionist) => nutritionist.appointments, { nullable: false })
  nutritionist: NutritionistEntity;

  @Column({ type: 'timestamp' })
  appointment_date: Date;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' })
  status: 'pending' | 'confirmed' | 'cancelled';

  @Column({ type: 'varchar', nullable: true })
  google_calendar_event_id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
