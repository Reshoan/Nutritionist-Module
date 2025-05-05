import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: process.env.ACCESS_TOKEN_SECRET_KEYS,
    signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
  }),],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
