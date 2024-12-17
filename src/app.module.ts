/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host:'192.168.43.138',
      type:"mysql",
      port:3306,
      database:'digi-store',
      username:'root',
      password:'',

      synchronize:true,
      entities:[User]
    }),
    UsersModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
