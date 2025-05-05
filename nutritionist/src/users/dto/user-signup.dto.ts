import { IsNotEmpty, IsEmail, IsString, MinLength, Validate } from "class-validator";
import { Roles } from "src/utility/common/user-roles.enum";
import { IsValidRole } from "src/utility/validators/role-validator";
import { UserSigninDto } from "./user-signin.dto";

export class UserSignupDto extends UserSigninDto{
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

}