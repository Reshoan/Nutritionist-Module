import { Injectable } from '@nestjs/common';
import { CreateFoodIndexDto } from './dto/create-food-index.dto';
import { UpdateFoodIndexDto } from './dto/update-food-index.dto';

@Injectable()
export class FoodIndexService {
  create(createFoodIndexDto: CreateFoodIndexDto) {
    return 'This action adds a new foodIndex';
  }

  findAll() {
    return `This action returns all foodIndex`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodIndex`;
  }

  update(id: number, updateFoodIndexDto: UpdateFoodIndexDto) {
    return `This action updates a #${id} foodIndex`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodIndex`;
  }
}
