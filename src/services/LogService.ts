import { mongoClient } from '../config/mongo';

export class LogService {
  // Método para salvar erros
  async saveError(action: string, errorDetails: any) {
    const db = mongoClient.db('logtrack_logs');
    const logsCollection = db.collection('api_errors');

    await logsCollection.insertOne({
      action,
      details: errorDetails,
      timestamp: new Date(),
      level: 'error'
    });
  }

  // Novo método para buscar logs (Agregação simples)
  async getLogs() {
    const db = mongoClient.db('logtrack_logs');
    const logsCollection = db.collection('api_errors');

    return await logsCollection
      .find()
      .sort({ timestamp: -1 }) // Ordena pelos mais recentes
      .limit(10)               // Pega os últimos 10
      .toArray();
  }

  async getErrorReport() {
  const db = mongoClient.db('logtrack_logs');
  const logsCollection = db.collection('api_errors');

  // Pipeline de Agregação: Agrupa por 'action' e conta as ocorrências
  return await logsCollection.aggregate([
    {
      $group: {
        _id: "$action", // Agrupa pelo campo action
        total_errors: { $sum: 1 }, // Soma 1 para cada ocorrência
        last_error_at: { $max: "$timestamp" } // Pega a data mais recente
      }
    },
    { $sort: { total_errors: -1 } } // Ordena do erro mais frequente para o menos
  ]).toArray();
  }
}