import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserType } from 'src/utility/common/enums/user-type.enum';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsEnum(UserType)
  userType: UserType;

  @IsString()
  @IsNotEmpty()
  name: string;
}
