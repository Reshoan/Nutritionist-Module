import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Client {
@PrimaryGeneratedColumn('uuid')
clientId: string;

@OneToOne(() => User, user => user.clientProfile, { cascade: true })
@JoinColumn()
user: User;
}