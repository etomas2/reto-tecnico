import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';
@Entity({ name: 'transactions_status' })
export class TransactionStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
