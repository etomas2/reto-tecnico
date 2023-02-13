import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';
@Entity({ name: 'transaction_types' })
export class TransactionType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
