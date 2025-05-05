import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressTrackingDto } from './create-progress-tracking.dto';

export class UpdateProgressTrackingDto extends PartialType(CreateProgressTrackingDto) {}
