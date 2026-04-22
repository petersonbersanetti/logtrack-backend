import { Request, Response } from 'express';
import { LogService } from '../services/LogService';

export class LogController {
  async index(req: Request, res: Response) {
    const service = new LogService();
    try {
      const logs = await service.getLogs();
      return res.json(logs);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar logs no MongoDB." });
    }
  }

  async report(req: Request, res: Response) {
  const service = new LogService();
  try {
    const report = await service.getErrorReport();
    return res.json(report);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao gerar relatório de auditoria." });
  }
}
}