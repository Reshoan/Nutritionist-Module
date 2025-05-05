import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('nutritionists')
export class NutritionistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  profilePictureUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  specialization: string;

  @Column({ type: 'int', default: 0 })
  yearsOfExperience: number;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

/*
This file defines a TypeScript class `NutritionistEntity` that represents a database entity for a "nutritionist" in a system. It uses the TypeORM library to map the class to a database table named `nutritionists`. Here's a breakdown of the code:

### Imports
```typescript
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
```
- These are decorators and utilities from TypeORM used to define and configure the database schema.

### Entity Definition
```typescript
@Entity('nutritionists')
export class NutritionistEntity {
```
- The `@Entity('nutritionists')` decorator marks this class as a database entity and maps it to the `nutritionists` table.

### Fields
Each field in the class corresponds to a column in the database table. The decorators configure the column's type, constraints, and other properties.

1. **Primary Key**
   ```typescript
   @PrimaryGeneratedColumn()
   id: number;
   ```
   - `id` is the primary key of the table, and its value is auto-generated.

2. **Basic Columns**
   ```typescript
   @Column({ type: 'varchar', length: 100 })
   name: string;

   @Column({ type: 'varchar', length: 150, unique: true })
   email: string;
   ```
   - `name` is a string column with a maximum length of 100 characters.
   - `email` is a unique string column with a maximum length of 150 characters.

3. **Optional Columns**
   ```typescript
   @Column({ type: 'varchar', nullable: true })
   phone: string;

   @Column({ type: 'text', nullable: true })
   bio: string;

   @Column({ type: 'varchar', nullable: true })
   profilePictureUrl: string;

   @Column({ type: 'varchar', length: 100, nullable: true })
   specialization: string;
   ```
   - These columns are optional (`nullable: true`), meaning they can store `NULL` values in the database.

4. **Default Values**
   ```typescript
   @Column({ type: 'int', default: 0 })
   yearsOfExperience: number;

   @Column({ type: 'float', default: 0 })
   rating: number;

   @Column({ type: 'boolean', default: true })
   isActive: boolean;
   ```
   - These columns have default values if no value is provided when a record is created.

5. **Location**
   ```typescript
   @Column({ type: 'varchar', nullable: true })
   location: string;
   ```
   - An optional string column for storing the nutritionist's location.

6. **Timestamps**
   ```typescript
   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
   ```
   - `createdAt` is automatically set to the current timestamp when a record is created.
   - `updatedAt` is automatically updated to the current timestamp whenever a record is modified.

### Summary
This class defines a comprehensive schema for a "nutritionist" entity, including personal details (name, email, phone, bio, etc.), professional details (specialization, years of experience, rating), and metadata (timestamps, active status). TypeORM will use this class to create and manage the corresponding database table.
*/