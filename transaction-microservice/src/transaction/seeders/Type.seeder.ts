// In a separate file, define the seeder
import { Connection, EntityManager } from 'typeorm';
import { TransactionType } from '../models/TransactionType.entity';

export const seedTypes = async (connection: Connection, manager: EntityManager): Promise<void> => {
  const repository = manager.getRepository(TransactionType);

  const types = [
    { name: 'Type 01' },
    { name: 'Type 02' },
    { name: 'Type 03' },
    { name: 'Type 04' },
    { name: 'Type 05' },
  ];

  for (const type of types) {
    await repository.save(repository.create(type));
  }
};
