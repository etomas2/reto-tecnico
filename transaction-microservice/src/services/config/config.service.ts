export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;
  constructor() {
    this.envConfig = {
      port: process.env.TRANSACTION_SERVICE_PORT,
    };
  }
  get(key: string): any {
    console.log("TRANSACTION SERVICE PORT => ", this.envConfig[key])
    return this.envConfig[key];
  }
}
