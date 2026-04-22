import { TransactionRepository } from '../repositories/TransactionRepository';
import { LogService } from './LogService';

export class TransactionService {
  private repository = new TransactionRepository();
  private logService = new LogService();

  async execute(data: { description: string, amount: number, type: string, category: string }) {
    
    if (data.amount <= 0) {
      await this.logService.saveError('CREATE_TRANSACTION', {
        message: 'Tentativa de valor negativo ou zero',
        data_received: data
      });

      throw new Error("O valor da transação deve ser maior que zero.");
    }

    return await this.repository.create(data);
  }

  async listAll() {
    return await this.repository.findAll();
  }
}