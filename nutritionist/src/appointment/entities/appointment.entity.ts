import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    } from 'typeorm';
    import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';
    import { Client } from 'src/client/entities/client.entity';
    
    @Entity()
    export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    appointmentId: string;
    
    @Column({ type: 'date' })
    appointmentDate: string;
    
    @Column({ type: 'time' })
    appointmentTime: string;
    
    @Column()
    meetLink: string;
    
    @Column({ default: false })
    emailSent: boolean;
    
    @ManyToOne(() => Nutritionist)
    @JoinColumn({ name: 'nutritionistId' })
    nutritionist: Nutritionist;
    
    @ManyToOne(() => Client)
    @JoinColumn({ name: 'clientId' })
    client: Client;
    }