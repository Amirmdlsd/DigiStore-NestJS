import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: 'DIGI_STORE_SECRET',
      signOptions: { expiresIn: '42h' },
    }),
    UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
