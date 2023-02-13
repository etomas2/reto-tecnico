export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;
  constructor() {
    this.envConfig = {
      port: process.env.ANTIFRAUD_SERVICE_PORT,
    };
  }
  get(key: string): any {
    console.log("ANTIFRAUD SERVICE PORT => ", this.envConfig[key])
    return this.envConfig[key];
  }
}
