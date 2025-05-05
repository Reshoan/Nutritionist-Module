import { Injectable } from '@nestjs/common';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';

@Injectable()
export class NutritionistsService {
  create(createNutritionistDto: CreateNutritionistDto) {
    return 'This action adds a new nutritionist';
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
