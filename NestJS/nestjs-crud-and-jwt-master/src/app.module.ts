import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import config from 'ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, CommentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
