import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FoodIndexService } from './food-index.service';
import { CreateFoodIndexDto } from './dto/create-food-index.dto';
import { UpdateFoodIndexDto } from './dto/update-food-index.dto';

@Controller('food-index')
export class FoodIndexController {
  constructor(private readonly foodIndexService: FoodIndexService) {}

  @Post()
  create(@Body() createFoodIndexDto: CreateFoodIndexDto) {
    return this.foodIndexService.create(createFoodIndexDto);
  }

  @Get()
  findAll() {
    return this.foodIndexService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodIndexService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodIndexDto: UpdateFoodIndexDto) {
    return this.foodIndexService.update(+id, updateFoodIndexDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodIndexService.remove(+id);
  }
}
