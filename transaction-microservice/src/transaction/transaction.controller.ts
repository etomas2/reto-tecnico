import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TransactionService } from "./transaction.service";

@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}
  @MessagePattern('save_transaction')
  async saveTransaction(data) {
    return this.transactionService.save(data);
  }
  @MessagePattern('get_transaction')
  async getTransaction(data) {
    return this.transactionService.get(data);
  }
  @MessagePattern('update_status_transaction')
  async updateStatusTransaction(data) {
    return this.transactionService.updateStatusTransaction(data);
  }
}
