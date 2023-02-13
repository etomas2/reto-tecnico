import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ValidateTransactionService } from "./validate-transaction.service";

@Controller()
export class ValidateTransactionController {
  constructor(
    private readonly validateService: ValidateTransactionService,
  ) {}
  @MessagePattern('validate_transaction')
  async getHello(data) {
    return this.validateService.validate(data);
  }
}
