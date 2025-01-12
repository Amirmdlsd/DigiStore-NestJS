import { SetMetadata } from "@nestjs/common";

export const  ROLE_KEY = 'roles';

export const Role =(...roles:Array<string>)=> SetMetadata(ROLE_KEY,roles)

