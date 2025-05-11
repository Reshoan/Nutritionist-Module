import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
import { Nutritionist } from 'src/nutritionist/entities/nutritionist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Nutritionist])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
