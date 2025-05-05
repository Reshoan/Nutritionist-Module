import { IsNotEmpty, IsEmail, IsString, MinLength, Validate } from "class-validator";


export class UserSigninDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
    
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

}