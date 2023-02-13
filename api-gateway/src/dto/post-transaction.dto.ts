import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class PostTransactionDto {
  @ApiProperty({ example: '100'})
  @IsNotEmpty({message: 'accountExternalIdDebit no puede ir vacio'})
  "accountExternalIdDebit": string;
  @ApiProperty({ example: '200'})
  @IsNotEmpty({message: 'accountExternalIdCredit no puede ir vacio'})
  "accountExternalIdCredit": string;
  @ApiProperty({ example: 1})
  @IsNotEmpty({message: 'tranferTypeId no puede ir vacio'})
  "tranferTypeId": number;
  @ApiProperty({ example: 1})
  @IsNotEmpty({message: 'transactionTypeId no puede ir vacio (Ejemplos del 1 a 5).'})
  "transactionTypeId": number;
  @ApiProperty({ example: 100.50, type: 'float'})
  @IsNotEmpty({message: 'value no puede ir vacio'})
  "value": string;
  transactionStatusId: number;
  createdAt: string;
}
