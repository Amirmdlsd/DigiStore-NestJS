import { Module } from '@nestjs/common';

import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      port:3306,
      database:'digi-store',
      username:'root',
      password:'',
      host:'localhost',

      synchronize:true,
      entities:[User]
    }),
    UsersModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
