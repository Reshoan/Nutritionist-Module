import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NutritionistsService } from './nutritionists.service';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';

@Controller('nutritionists')
export class NutritionistsController {
  constructor(private readonly nutritionistsService: NutritionistsService) {}

  @Post()
  create(@Body() createNutritionistDto: CreateNutritionistDto) {
    return this.nutritionistsService.create(createNutritionistDto);
  }

  @Get()
  findAll() {
    return this.nutritionistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutritionistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNutritionistDto: UpdateNutritionistDto) {
    return this.nutritionistsService.update(+id, updateNutritionistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutritionistsService.remove(+id);
  }
}
