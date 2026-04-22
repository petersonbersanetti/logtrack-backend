import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL || '';
const client = new MongoClient(url);

export async function connectMongo() {
  try {
    await client.connect();
    console.log("🍃 Conectado ao MongoDB (Logs)");
    return client.db('logtrack_logs');
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    throw error;
  }
}

export const mongoClient = client;