/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
  imports:[
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname,'../../uploads/avatar'),
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
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
