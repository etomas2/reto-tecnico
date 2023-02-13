import {HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(data): object {
    return {
      status: HttpStatus.OK,
      message: 'Hello World!',
      data: data,
      errors: null,
    };
  }
}
