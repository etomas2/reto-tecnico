import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { TransactionType } from './TransactionType.entity';
import {TransactionStatus} from "./TransactionStatus.entity";
@Entity({ name: 'transaction' })
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @PrimaryColumn()
  transactionExternalId: number;
  @Column()
  accountExternalIdDebit: string;
  @Column()
  accountExternalIdCredit: string;
  @Column({ unique: false, default: 1 })
  tranferTypeId: number;
  @Column({ type: 'numeric', precision: 10, scale: 2, unique: false, default: 1 })
  value: number;
  /*@Column({ default: 1 })
  transactionStatus: number;*/
  @Column()
  createdAt: Date;
  @Column({ unique: false, default: 1 })
  transactionTypeId: number;
  @ManyToOne(() => TransactionType)
  @JoinColumn({ name: 'transactionTypeId'})
  transactionType: TransactionType;

  @Column({ unique: false, default: 1 })
  transactionStatusId: number;
  @ManyToOne(() => TransactionStatus)
  @JoinColumn({ name: 'transactionStatusId'})
  transactionStatus: TransactionStatus;
}
