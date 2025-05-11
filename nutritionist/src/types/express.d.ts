import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
