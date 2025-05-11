import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NutritionistService } from './nutritionist.service';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('nutritionist')
export class NutritionistController {
  constructor(private readonly nutritionistService: NutritionistService) {}

  @Post()
  create(@Body() createNutritionistDto: CreateNutritionistDto) {
    return this.nutritionistService.create(createNutritionistDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLIENT')
  @Get('available')
  getAvailableNutritionists() {
    return this.nutritionistService.findAllAvailable();
  }

  @Get()
  findAll() {
    return this.nutritionistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutritionistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNutritionistDto: UpdateNutritionistDto) {
    return this.nutritionistService.update(+id, updateNutritionistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutritionistService.remove(+id);
  }
}
