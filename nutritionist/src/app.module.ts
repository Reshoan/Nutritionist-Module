import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { NutritionistModule } from './nutritionist/nutritionist.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { AppointmentRequestModule } from './appointment-request/appointment-request.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), NutritionistModule, AppointmentModule, ClientModule, UserModule, AppointmentRequestModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
