import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserType } from 'src/utility/common/enums/user-type.enum';

export class UserResponseDto {
  userId: string;
  email: string;
  name: string;
  userType: UserType;
}
