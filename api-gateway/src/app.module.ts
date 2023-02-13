import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import {
  ClientProxyFactory,
} from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from "./app.controller";
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), ],
  controllers: [
    AppController,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    {
      provide: 'ANTIFRAUD_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('antiFraudService'));
      },
      inject: [ConfigService],
    },
    {
      provide: 'TRANSACTION_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('transactionService'));
      },
      inject: [ConfigService],
    },
    /*{
      provide: APP_GUARD,
      useClass: AuthGuard,
    },*/
  ],
})
export class AppModule {}
