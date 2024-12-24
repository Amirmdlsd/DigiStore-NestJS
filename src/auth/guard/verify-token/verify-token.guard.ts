/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const AuthorizationHeader = req.headers.authorization;
    const {type , token }= AuthorizationHeader.split(' ');
    if(type !== 'Bearer'){
      throw new UnauthorizedException('توکن معتبر نیست');
    }
    const decodedToken = this.jwtService.verify(token);
    if(
      req.body.phone !== decodedToken.phone  ){
      throw new UnauthorizedException('توکن معتبر نیست');

    }

    return true;
  }
}
