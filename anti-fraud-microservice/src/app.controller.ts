import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}
  @MessagePattern('test_hello')
  async getHello(data) {
    return this.appService.getHello(data);
  }
}
