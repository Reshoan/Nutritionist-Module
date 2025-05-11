import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { Nutritionist } from './entities/nutritionist.entity'; 
import { Repository } from 'typeorm';

@Injectable()
export class NutritionistService {
  constructor(
    @InjectRepository(Nutritionist)
    private readonly nutritionistRepository: Repository<Nutritionist>,
  ) {}
  create(createNutritionistDto: CreateNutritionistDto) {
    return 'This action adds a new nutritionist';
  }

  async findAllAvailable(): Promise<Partial<Nutritionist>[]> {
  return this.nutritionistRepository
    .createQueryBuilder('nutritionist')
    .leftJoinAndSelect('nutritionist.user', 'user')
    .select([
      'nutritionist.nutritionistId',
      'user.name',
      'user.email',
      'user.userType' 
    ])
    .getMany();
}


  findAll() {
    return `This action returns all nutritionist`;
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
