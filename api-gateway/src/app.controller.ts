import {Body, Controller, Get, HttpStatus, Inject, Param, Post, Put, Req, Res} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import {Response} from "express";
import {firstValueFrom, timeout} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import * as moment from 'moment-timezone';
import {PostTransactionDto} from "./dto/post-transaction.dto";
@Controller('transaction')
@ApiTags('transaction')
export class AppController {
  constructor(
    @Inject('ANTIFRAUD_SERVICE') private readonly serviceValidationClient: ClientProxy,
    @Inject('TRANSACTION_SERVICE') private readonly serviceTransactionClient: ClientProxy,
  ) {}
  @Post('/')
  public async saveTransaction(@Req() request, @Res() res: Response, @Body() body: PostTransactionDto) {
    try {
      const transaction = body;
      transaction.transactionStatusId = 1;
      transaction.createdAt = moment.tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
      let responseTransaction = await firstValueFrom(
        this.serviceTransactionClient
          .send('save_transaction', transaction)
          .pipe(timeout(5000)),
      );
      if(responseTransaction.errors) { throw new Error(responseTransaction.errors) }

      responseTransaction = await firstValueFrom(
        this.serviceTransactionClient
          .send('get_transaction', {
            id: responseTransaction.data.transaction.transactionExternalId,
          })
          .pipe(timeout(5000)),
      );
      if(responseTransaction.errors) { throw new Error(responseTransaction.errors) }

      res.status(responseTransaction.status).json({
        status: responseTransaction.status,
        message: 'save_transaction_sucess',
        data: responseTransaction.data ? responseTransaction.data : null,
        errors: responseTransaction.errors,
      });
    } catch (e) {
      console.log('saveTransaction error', e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'save_transaction_error',
        data: null,
        errors: e.message,
      });
    }
  }
  @Get('/:uuid')
  public async getTransaction(@Param('uuid') uuid: string, @Res() res: Response,) {
    try {
      const response = await firstValueFrom(
        this.serviceTransactionClient
          .send('get_transaction', {
            id: uuid,
          })
          .pipe(timeout(5000)),
      );
      if(response.errors) { throw new Error(response.errors) }
      if (response.data.transaction.length === 0) { response.message = 'transaction_not_found'; }
      res.status(response.status).json({
        status: response.status,
        message: response.message,
        data: response.data ? response.data : null,
        errors: response.errors,
      });
    } catch (e) {
      console.log('getTransaction error: ', e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'get_transaction_error',
        data: null,
        errors: e.message,
      });
    }
  }
  @Put('/update-status/:uuid')
  public async approveTransaction(@Param('uuid') uuid: string, @Res() res: Response,) {
    try {
      let response = await firstValueFrom(
        this.serviceTransactionClient
          .send('get_transaction', {
            id: uuid,
          })
          .pipe(timeout(5000)),
      );
      if(response.errors) { throw new Error(response.errors) }

      const transaction = response.data.transaction[0];

      if (transaction.length === 0) { throw new Error('transaction_not_found') }
      if (transaction.transactionStatusId !== 1) { throw new Error('Transaction not pending'); }
      transaction.transactionStatusId = 2;

      console.log('transaction 0001', transaction);

      response = await firstValueFrom(
        this.serviceValidationClient.send(
          'validate_transaction',
          response.data.transaction[0])
          .pipe(timeout(5000)),
      );

      console.log('transaction 0002 response', response);

      if(response.errors) { throw new Error(response.errors) }
      if(response.data.status !== 'approved') { transaction.transactionStatusId = 3; }

      response = await firstValueFrom(
        this.serviceTransactionClient
          .send('update_status_transaction', transaction)
          .pipe(timeout(5000)),
      );
      res.status(response.status).json({
        status: response.status,
        message: response.message,
        data: response.data ? response.data : null,
        errors: response.errors,
      });
    } catch (e) {
      console.log('getTransaction error: ', e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'get_transaction_error',
        data: null,
        errors: e.message,
      });
    }
  }
}
