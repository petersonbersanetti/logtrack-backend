import { mongoClient } from '../config/mongo';

export class LogService {
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

  async getLogs() {
    const db = mongoClient.db('logtrack_logs');
    const logsCollection = db.collection('api_errors');

    return await logsCollection
      .find()
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();
  }

  async getErrorReport() {
  const db = mongoClient.db('logtrack_logs');
  const logsCollection = db.collection('api_errors');

  return await logsCollection.aggregate([
    {
      $group: {
        _id: "$action",
        total_errors: { $sum: 1 },
        last_error_at: { $max: "$timestamp" }
      }
    },
    { $sort: { total_errors: -1 } }
  ]).toArray();
  }
}