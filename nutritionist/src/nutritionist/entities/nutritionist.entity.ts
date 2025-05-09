import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Appointment } from 'src/appointment/entities/appointment.entity';
  
  @Entity('nutritionist')
  export class Nutritionist {
    @PrimaryGeneratedColumn()
    nutritionist_id: number;
  
    @Column({ type: 'varchar', length: 100 })
    name: string;
  
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255 })
    password_hash: string;
  
    @OneToMany(() => Appointment, (appointment) => appointment.nutritionist)
    appointments: Appointment[];
  }
  