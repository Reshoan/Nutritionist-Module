// src/auth/jwt.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'yourSecret', // use env var in production
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      userType: payload.userType,
    };
  }
}
