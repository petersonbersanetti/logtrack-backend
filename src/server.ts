import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { TransactionController } from './controllers/TransactionController';

const app = express();
const prisma = new PrismaClient();
const transactionController = new TransactionController();

app.use(cors());
app.use(express.json());

// Rotas
app.get('/health', async (req, res) => {
  const count = await prisma.transaction.count();
  res.json({ status: 'UP', records: count });
});


app.post('/transactions', (req, res) => transactionController.create(req, res));
app.get('/transactions', (req, res) => transactionController.index(req, res));

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});