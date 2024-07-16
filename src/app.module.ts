import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/middelwares/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CatsModule,
    AuthModule, 
    UsersModule,     
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '260803',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),  
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }  
}
