import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException('Token de autenticação não encontrado');
    }
    try {
      const payload = this.jwtService.verify<{ sub: string }>(token, {
        secret: process.env.SECRET_KEY,
      });
      request['userId'] = payload.sub;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
    return true;
  }
  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.['forum-token'] as string | undefined;
  }
}
