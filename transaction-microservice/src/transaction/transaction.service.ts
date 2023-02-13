import {HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction} from "./models/Transaction.entity";
import * as console from "console";
@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}
  async save(data) {
    try {
      const transaction = await this.transactionRepository.save(data);
      return {
        status: HttpStatus.OK,
        message: 'save_transaction_success',
        data: {
          transaction: transaction,
        },
        errors: null,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'save_transaction_error',
        data: null,
        errors: e.message,
      };
    }
  }
  async get(data) {
    try {
      console.log("get_transaction data: ", data);
      const transaction = await this.transactionRepository.find({
        where: {  transactionExternalId: data.id },
        select: {
          transactionType: {
            name: true
          },
          transactionStatus: {
            name: true
          },
        },
        relations: ["transactionType","transactionStatus"]
      });
      return {
        status: HttpStatus.OK,
        message: 'get_transaction_success',
        data: {
          transaction: transaction,
        },
        errors: null,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'get_transaction_error',
        data: null,
        errors: e.message,
      };
    }
  }
  async updateStatusTransaction(data) {
    try {
      await this.transactionRepository.update(data.transactionExternalId, {transactionStatusId: data.transactionStatusId});
      const transaction = await this.transactionRepository.find({
        where: {  transactionExternalId: data.transactionExternalId },
        select: {
          transactionType: {
            name: true
          },
          transactionStatus: {
            name: true
          },
        },
        relations: ["transactionType","transactionStatus"]
      });
      return {
        status: HttpStatus.OK,
        message: 'update_status_transaction_success',
        data: {
          transaction: transaction,
        },
        errors: null,
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'update_status_transaction_error',
        data: null,
        errors: e.message,
      };
    }
  }
}
