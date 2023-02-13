// In a separate file, define the seeder
import { Connection, EntityManager } from 'typeorm';
import { TransactionStatus } from "../models/TransactionStatus.entity";

export const seedStatuses = async (connection: Connection, manager: EntityManager): Promise<void> => {
  const repository = manager.getRepository(TransactionStatus);

  const statuses = [
    { name: 'Pendiente' },
    { name: 'Aprobado' },
    { name: 'Rechazado' },
  ];

  for (const status of statuses) {
    await repository.save(repository.create(status));
  }
};
