import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { NutritionistEntity } from './entities/nutritionist.entity';

@Injectable()
export class NutritionistsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(NutritionistEntity)
    private readonly nutritionistRepo: Repository<NutritionistEntity>
  ) {}

  async create(data: CreateNutritionistDto) {
    const user = await this.userRepository.findOne({
      where: { id: data.userId.toString() },
    });

    if (!user) throw new NotFoundException('User not found');

    const nutritionist = this.nutritionistRepo.create({
      user,
      certifications: data.certifications,
      specializations: data.specializations,
      experience_years: data.experience_years,
      profile_picture_url: data.profile_picture_url,
      availability_schedule: data.availability_schedule,
    });

    return this.nutritionistRepo.save(nutritionist);
  }

  findAll() {
    return `This action returns all nutritionists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nutritionist`;
  }

  update(id: number, updateNutritionistDto: UpdateNutritionistDto) {
    return `This action updates a #${id} nutritionist`;
  }

  remove(id: number) {
    return `This action removes a #${id} nutritionist`;
  }
}
