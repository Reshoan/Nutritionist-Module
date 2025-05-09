import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';
  import { Client } from 'src/client/entities/client.entity';
  
  @Entity('appointment')
  export class Appointment {
    @PrimaryGeneratedColumn()
    appointment_id: number;
  
    @ManyToOne(() => Nutritionist, (nutritionist) => nutritionist.appointments, { eager: true })
    @JoinColumn({ name: 'nutritionist_id' })
    nutritionist: Nutritionist;
  
    @ManyToOne(() => Client, (client) => client.appointments, { eager: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;
  
    @Column({ type: 'date' })
    appointment_date: string;
  
    @Column({ type: 'time' })
    appointment_time: string;
  
    @Column({ type: 'varchar', length: 255 })
    meet_link: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    calendar_event_id_client: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    calendar_event_id_nutritionist: string;
  }
  