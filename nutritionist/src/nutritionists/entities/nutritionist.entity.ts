// src/nutritionist/entities/nutritionist.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { AppointmentEntity } from "src/appointments/entities/appointment.entity";
import { MealPlanEntity } from 'src/meal-plan/entities/meal-plan.entity';


@Entity("nutritionists")
export class NutritionistEntity {
  @PrimaryGeneratedColumn()
  nutritionist_id: number;

  @Column("text", { array: true, nullable: true })
  certifications: string[];

  @Column("text", { array: true, nullable: true })
  specializations: string[];

  @Column({ type: "int" })
  experience_years: number;

  @Column({ nullable: true })
  profile_picture_url: string;

  @Column({ type: "jsonb", nullable: true })
  availability_schedule: any;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.nutritionist)
  appointments: AppointmentEntity[];

  @OneToMany(() => MealPlanEntity, (mealPlan) => mealPlan.nutritionist)
  mealPlans: MealPlanEntity[];
}
