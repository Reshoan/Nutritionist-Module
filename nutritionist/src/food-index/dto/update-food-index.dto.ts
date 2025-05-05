import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodIndexDto } from './create-food-index.dto';

export class UpdateFoodIndexDto extends PartialType(CreateFoodIndexDto) {}
