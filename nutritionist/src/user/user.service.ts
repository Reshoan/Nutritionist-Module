import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/utility/common/enums/user-type.enum';
import { Client } from 'src/client/entities/client.entity';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Nutritionist)
    private readonly nutritionistRepository: Repository<Nutritionist>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async register(dto: CreateUserDto): Promise<Partial<User>> {
  const { email, password, userType, name } = dto;

  const existing = await this.userRepository.findOne({ where: { email } });
  if (existing) {
    throw new BadRequestException('Email already registered');
  }

  const user = this.userRepository.create({
    email,
    password: await bcrypt.hash(password, 10),
    userType,
    name,
  });

  const savedUser = await this.userRepository.save(user);

  if (userType === UserType.CLIENT) {
    const client = this.clientRepository.create({
      clientId: savedUser.userId,   // Set clientId = userId
      user: savedUser,
    });
    await this.clientRepository.save(client);
  } else if (userType === UserType.NUTRITIONIST) {
    const nutritionist = this.nutritionistRepository.create({
      nutritionistId: savedUser.userId,  // Set nutritionistId = userId
      user: savedUser,
    });
    await this.nutritionistRepository.save(nutritionist);
  }

  const { password: _, ...safeUser } = savedUser;
  return safeUser;
}


async findByEmail(email: string): Promise<User | null> {
  return await this.userRepository.findOne({ where: { email } });
}



  findAll() {
    return `This action returns all user`;
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
}
