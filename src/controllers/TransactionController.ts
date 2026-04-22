import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  async create(req: Request, res: Response) {
    const { description, amount, type, category } = req.body;
    const service = new TransactionService();

    try {
      const transaction = await service.execute({ description, amount, type, category });
      return res.status(201).json(transaction);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req: Request, res: Response) {
  const service = new TransactionService();
  try {
    const transactions = await service.listAll();
    return res.json(transactions);
  } catch (error: any) {
    return res.status(500).json({ error: "Erro interno ao listar transações." });
  }
  }
}