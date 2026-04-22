import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionRepository {
  async create(data: { description: string, amount: number, type: string, category: string }) {
    return await prisma.transaction.create({
      data
    });
  }

  async findAll() {
    return await prisma.transaction.findMany();
  }

  async findAll() {
  return await prisma.transaction.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}
}