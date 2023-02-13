import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT;
    this.envConfig.antiFraudService = {
      options: {
        port: process.env.ANTIFRAUD_SERVICE_PORT,
        host: process.env.ANTIFRAUD_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
    this.envConfig.transactionService = {
      options: {
        port: process.env.TRANSACTION_SERVICE_PORT,
        host: process.env.TRANSACTION_SERVICE_HOST,
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    console.log('key', key);
    return this.envConfig[key];
  }
}
