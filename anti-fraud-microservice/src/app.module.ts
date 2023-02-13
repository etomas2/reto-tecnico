import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './services/config/config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios/dist';

import {ValidateTransactionController} from "./validateTransaction/validate-transaction.controller";
import {ValidateTransactionService} from "./validateTransaction/validate-transaction.service";
@Module({
  imports: [HttpModule, ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: true,
    synchronize: false,
  })],
  providers: [
    ConfigService,
    AppService,
    ValidateTransactionService
  ],
  controllers: [AppController, ValidateTransactionController],

})
export class AppModule {}
