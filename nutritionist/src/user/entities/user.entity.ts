import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';
import { Client } from 'src/client/entities/client.entity';
import { UserType } from 'src/utility/common/enums/user-type.enum';

@Entity('users')
export class User {
@PrimaryGeneratedColumn('uuid')
userId: string;

@Column()
name: string;

@Column({ unique: true })
email: string;

@Column()
password: string;

@Column({ type: 'enum', enum: UserType })
userType: UserType;

@OneToOne(() => Nutritionist, nutritionist => nutritionist.user)
nutritionistProfile: Nutritionist;

@OneToOne(() => Client, client => client.user)
clientProfile: Client;
}