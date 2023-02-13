import {HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class ValidateTransactionService {
  validate(data): object {
    try {
      const response = {
        status: HttpStatus.OK,
        message: 'validate_proccess_success',
        data: {
          transaction: data,
          status: 'approved',
        },
        errors: null,
      }
      if (data.value > 1000) {
        response.data.status = 'rejected';
      }
      return response;
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'validate_proccess_error',
        data: null,
        errors: e.message,
      };
    }
  }
}
