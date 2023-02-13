import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from "./models/Transaction.entity";
import {TransactionService} from "./transaction.service";
import {TransactionController} from "./transaction.controller";
import {TransactionType} from "./models/TransactionType.entity";
import { Connection } from 'typeorm';
import { seedTypes } from './seeders/Type.seeder';
import { TransactionStatus } from "./models/TransactionStatus.entity";
import {seedStatuses} from "./seeders/Statuses.seeder";
import * as console from "console";

@Module({
  imports: [TypeOrmModule.forFeature([TransactionType, TransactionStatus, Transaction])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionsModule {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {

    const transactionType = await this.connection.getRepository(TransactionType).find();
    if(transactionType.length > 0) return;

    const transactionStatus = await this.connection.getRepository(TransactionStatus).find();
    if(transactionStatus.length > 0) return;

    await seedTypes(this.connection, this.connection.createEntityManager());
    await seedStatuses(this.connection, this.connection.createEntityManager());
  }
}
