// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller'; // ✅ Import controller

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController], // ✅ Add this line
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
