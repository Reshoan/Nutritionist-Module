import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { roles, UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import {hash, compare} from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { sign, SignOptions } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import {config} from "dotenv"
import { Roles } from 'src/utility/common/user-roles.enum';
config();


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ){}

  async signup(userSignUpDto: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findByEmail(userSignUpDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists, email is already in use');
    }
  
    // Default role fallback if roles not specified
    if (!userSignUpDto.roles || userSignUpDto.roles.length === 0) {
      userSignUpDto.roles = [Roles.CLIENT];
    }
  
    // Hash the password
    userSignUpDto.password = await hash(userSignUpDto.password, 10);
  
    // Create and save the user
    const user = await this.userRepository.save(
      this.userRepository.create(userSignUpDto) // <-- fixed this line
    );
  
    const { password, ...result } = user;
    return result as UserEntity;
  }
  
  
  async signin(userSignInDto: UserSigninDto): Promise<UserEntity> {
    const userExists = await this.userRepository.createQueryBuilder('users').addSelect('users.password').where('users.email = :email', { email: userSignInDto.email }).getOne();
    if(!userExists) throw new BadRequestException('User does not exist, please signup first');
    const matchPassword = await compare(userSignInDto.password, userExists.password);
    if(!matchPassword) throw new BadRequestException('Invalid password, please try again');

    const { password, ...result } = userExists;
    return result as UserEntity;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
  
}
