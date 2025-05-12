import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNutritionistDto } from './dto/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dto/update-nutritionist.dto';
import { Nutritionist } from './entities/nutritionist.entity';
import { Repository } from 'typeorm';
import { AppointmentRequest } from 'src/appointment-request/entities/appointment-request.entity';
import { RequestStatus } from 'src/appointment-request/entities/appointment-request.entity';

@Injectable()
export class NutritionistService {
  constructor(
    @InjectRepository(Nutritionist)
    private readonly nutritionistRepository: Repository<Nutritionist>,
     @InjectRepository(AppointmentRequest)
    private readonly appointmentRequestRepository: Repository<AppointmentRequest>,
  ) {}

  async create(dto: CreateNutritionistDto): Promise<Nutritionist> {
    const nutritionist = this.nutritionistRepository.create(dto);
    return this.nutritionistRepository.save(nutritionist);
  }

  async getAppointmentRequests(nutritionistId: string): Promise<AppointmentRequest[]> {
    const nutritionist = await this.nutritionistRepository.findOne({
      where: { nutritionistId },
    });
    if (!nutritionist) {
      throw new NotFoundException('Nutritionist not found');
    }

    return this.appointmentRequestRepository.find({
      where: { nutritionist: { nutritionistId } },
      relations: ['client', 'client.user'],
      order: { requestedAt: 'DESC' },
    });
  }

  async updateAppointmentRequestStatus(requestId: string, status: RequestStatus): Promise<AppointmentRequest> {
    const request = await this.appointmentRequestRepository.findOne({
      where: { requestId },
      relations: ['nutritionist'],
    });
    if (!request) {
      throw new NotFoundException('Appointment request not found');
    }

    request.status = status;
    return this.appointmentRequestRepository.save(request);
  }

  async findAllAvailable(): Promise<Partial<Nutritionist>[]> {
    return this.nutritionistRepository
      .createQueryBuilder('nutritionist')
      .leftJoinAndSelect('nutritionist.user', 'user')
      .select([
        'nutritionist.nutritionistId',
        'user.name',
        'user.email',
        'user.userType',
      ])
      .getMany();
  }

  async findAll(): Promise<Nutritionist[]> {
    return this.nutritionistRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Nutritionist> {
    const nutritionist = await this.nutritionistRepository.findOne({
      where: { nutritionistId: id.toString() },
      relations: ['user'],
    });
    if (!nutritionist) throw new NotFoundException('Nutritionist not found');
    return nutritionist;
  }

  async update(id: number, dto: UpdateNutritionistDto): Promise<Nutritionist> {
    const nutritionist = await this.findOne(id);
    Object.assign(nutritionist, dto);
    return this.nutritionistRepository.save(nutritionist);
  }

  async remove(id: number): Promise<{ message: string }> {
    const nutritionist = await this.findOne(id);
    await this.nutritionistRepository.remove(nutritionist);
    return { message: 'Nutritionist removed successfully' };
  }
}
