import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/schemas/User.schema';
import { UserService } from 'src/users/users.sevice';

export interface ExpressRequest extends Request {
  user?: User;
}

@Injectable()
export class Auth implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    try {
      const decode = verify(token, 'secret123') as { email: string };
      const user = await this.userService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
