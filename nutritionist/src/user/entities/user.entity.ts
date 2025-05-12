import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';
import { Client } from 'src/client/entities/client.entity';
import { UserType } from 'src/utility/common/enums/user-type.enum';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  userId: string;

  @Column()
  @Expose()
  name: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserType })
  @Expose()
  userType: UserType;

  @OneToOne(() => Nutritionist, nutritionist => nutritionist.user)
  @Expose() // Add nutritionistProfile in response
  nutritionistProfile: Nutritionist;

  @OneToOne(() => Client, client => client.user)
  @Expose() 
  clientProfile: Client;
}
