import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NutritionistsService } from './nutritionists.service';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('nutritionists')
export class NutritionistsController {
  constructor(
    private readonly nutritionistsService: NutritionistsService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

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
