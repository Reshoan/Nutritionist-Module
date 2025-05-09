import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';

export enum RequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class AppointmentRequest {
  @PrimaryGeneratedColumn('uuid')
  requestId: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => Nutritionist)
  @JoinColumn({ name: 'nutritionistId' })
  nutritionist: Nutritionist;

  @Column({ type: 'timestamp' })
  preferredDateTime: Date;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @CreateDateColumn()
  requestedAt: Date;
}
