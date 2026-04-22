import { TransactionRepository } from '../repositories/TransactionRepository';

export class TransactionService {
  private repository = new TransactionRepository();

  async execute(data: { description: string, amount: number, type: string, category: string }) {
    // Exemplo de Troubleshooting/Validação:
    if (data.amount <= 0) {
      throw new Error("O valor da transação deve ser maior que zero.");
    }

    return await this.repository.create(data);
  }

  async listAll() {
  return await this.repository.findAll();
  }

}