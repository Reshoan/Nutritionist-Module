import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Nutritionist {
@PrimaryGeneratedColumn('uuid')
nutritionistId: string;

@OneToOne(() => User, user => user.nutritionistProfile, { cascade: true })
@JoinColumn()
user: User;
}