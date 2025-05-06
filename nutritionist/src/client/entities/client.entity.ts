// src/clients/entities/client.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { NutritionistEntity } from "src/nutritionists/entities/nutritionist.entity";
import { AppointmentEntity } from "src/appointments/entities/appointment.entity";
import { MealPlanEntity } from 'src/meal-plan/entities/meal-plan.entity';

@Entity("client")
export class ClientEntity {
  @PrimaryGeneratedColumn()
  client_id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => NutritionistEntity, (nutritionist) => nutritionist.nutritionist_id, { nullable: true })
  @JoinColumn({ name: "nutritionist_id" })
  nutritionist: NutritionistEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.client)
  appointments: AppointmentEntity[];

  @Column()
  goal: string;

  @Column()
  diet_preference: string;

  @Column({ type: "text", nullable: true })
  allergies: string;

  @Column({ type: "text", nullable: true })
  medical_conditions: string;

  @OneToMany(() => MealPlanEntity, (mealPlan) => mealPlan.client)
  mealPlans: MealPlanEntity[];
}
