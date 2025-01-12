/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/auth/decorator/role-decorator';

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService,private readonly reflector:Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const AuthorizationHeader = req.headers.authorization;
    if(!AuthorizationHeader){
      throw new UnauthorizedException('unauthorized');
    }
    const handler = this.reflector.get<string[]>(ROLE_KEY, context.getHandler());
    const token =  this.jwtService.verify(AuthorizationHeader,{secret:"DIGI_STORE_SECRET"});
    if(!token){
      throw new UnauthorizedException('unauthorized');
    }
    if(token.roles.some((role)=>handler.includes(role))){
      req['token'] = token;
      return true;
    }

    return false;
  }
}
