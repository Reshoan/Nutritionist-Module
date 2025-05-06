// src/meal-plans/entities/meal-plan.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { ClientEntity } from 'src/client/entities/client.entity';
  import { NutritionistEntity } from 'src/nutritionists/entities/nutritionist.entity';
  
  @Entity('meal_plans')
  export class MealPlanEntity {
    @PrimaryGeneratedColumn()
    meal_plan_id: number;
  
    @ManyToOne(() => ClientEntity, (client) => client.mealPlans, { nullable: false })
    client: ClientEntity;
  
    @ManyToOne(() => NutritionistEntity, (nutritionist) => nutritionist.mealPlans, { nullable: false })
    nutritionist: NutritionistEntity;
  
    @CreateDateColumn()
    created_at: Date;
  
    @Column({ type: 'varchar' })
    title: string;
  
    @Column({ type: 'text', nullable: true })
    notes?: string;
  
    @Column({ type: 'json' })
    meals: any; // ideally structured JSON with meal details
  }
  