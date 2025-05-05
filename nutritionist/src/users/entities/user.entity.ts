import { Roles } from "src/utility/common/user-roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column({ type: "varchar", length: 50 })
    name: string;
    
    @Column({ type: "varchar", length: 50, unique: true })
    email: string;
    
    @Column({ type: "varchar", length: 255 })
    password: string;
    
    @Column({ type: "boolean", default: false })
    isVerified: boolean;

    @Column( {type: 'enum', enum: Roles, array: true, default: [Roles.USER]})
    roles: Roles[];


}
