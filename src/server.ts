import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongo } from './config/mongo';
import { TransactionController } from './controllers/TransactionController';
import { LogController } from './controllers/LogController'; // Importe aqui

const app = express();
app.use(cors());
app.use(express.json());

const transactionController = new TransactionController();
const logController = new LogController();

console.log("🔍 Iniciando validação de infraestrutura...");

// Encapsulamos a subida do servidor na conexão do MongoDB
connectMongo()
  .then(() => {
    app.get('/logs/report', (req, res) => logController.report(req, res));
    app.get('/logs', (req, res) => logController.index(req, res));
    // 1. Rota de Health Check (Monitoramento)
    app.get('/health', (req, res) => {
      res.json({ 
        status: 'UP', 
        services: { database_sql: 'ready', database_nosql: 'ready' },
        timestamp: new Date().toISOString() 
      });
    });

    // 2. Rotas da Aplicação
    app.post('/transactions', (req, res) => transactionController.create(req, res));
    app.get('/transactions', (req, res) => transactionController.index(req, res));

    // 3. Inicialização do Servidor
    const PORT = 3333;
    app.listen(PORT, () => {
      console.log(`🚀 LogTrack API rodando em http://localhost:${PORT}`);
      console.log(`🍃 MongoDB: Conectado e pronto para logs.`);
    });
  })
  .catch((err) => {
    console.error("❌ ERRO CRÍTICO DE INFRAESTRUTURA:");
    console.error("A API não pôde ser iniciada porque a conexão com o MongoDB falhou.");
    console.error(err);
    process.exit(1); // Encerra o processo com erro
  });