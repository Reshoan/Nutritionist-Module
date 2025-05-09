import { Roles } from "src/utility/common/user-roles.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

export enum roles {
    ADMIN = 'admin',
    NUTRITIONALIST = 'nutritionist',
    CLIENT = 'client'
}

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({ type: "varchar", length: 50 })
    name: string;
    
    @Column({ type: "varchar", length: 50, unique: true })
    email: string;
    
    @Column({ type: "varchar", length: 255 , select: false })
    password: string;
    
    @Column({ type: "boolean", default: false })
    isVerified: boolean;

    @Column( {type: 'enum', enum: Roles, array: true, default: [Roles.CLIENT]})
    roles: Roles[];

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;
}
