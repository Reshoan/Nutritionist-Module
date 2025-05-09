import { IsNotEmpty, IsEmail, IsString, MinLength, Validate, IsOptional, IsArray,IsEnum } from "class-validator";
import { roles } from "../entities/user.entity";


export class UserSigninDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
    
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    

}