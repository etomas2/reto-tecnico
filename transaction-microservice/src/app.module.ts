import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './services/config/config.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios/dist';
import { DataSource } from 'typeorm';
import {Transaction} from "./transaction/models/Transaction.entity";
import {TransactionsModule} from "./transaction/transactions.module";
import {TransactionType} from "./transaction/models/TransactionType.entity";
import {TransactionStatus} from "./transaction/models/TransactionStatus.entity";
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Transaction, TransactionType, TransactionStatus],
      logging: true,
      synchronize: true,
    }),
    TransactionsModule
  ],
  providers: [
    ConfigService,
    AppService,
  ],
  controllers: [AppController],

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

