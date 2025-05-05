import { IsNotEmpty, IsEmail, IsString, MinLength, Validate } from "class-validator";
import { Roles } from "src/utility/common/user-roles.enum";
import { IsValidRole } from "src/utility/validators/role-validator";

export class UserSignupDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

}