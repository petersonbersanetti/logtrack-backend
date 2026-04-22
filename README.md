# 🚀 LogTrack Backend - Gestão Financeira com Auditoria Híbrida

Este é um projeto de backend robusto desenvolvido para o gerenciamento de transações financeiras, utilizando uma arquitetura de banco de dados híbrida (SQL + NoSQL). 

O projeto foi construído focando em **resiliência, observabilidade e performance**, ideal para cenários que exigem troubleshooting complexo e rastreabilidade.

## 🛠️ Tecnologias Utilizadas

- **Node.js & TypeScript 6**: Backend fortemente tipado para evitar erros em runtime.
- **PostgreSQL (via Prisma)**: Banco relacional para dados transacionais críticos (Garantia ACID).
- **MongoDB (Driver Nativo)**: Banco NoSQL utilizado para telemetria de erros e logs de auditoria.
- **Docker & Docker Compose**: Containerização completa da infraestrutura (Banco de dados e Aplicação).
- **WSL 2 (Ubuntu)**: Ambiente de desenvolvimento Linux nativo no Windows.

## 🏗️ Arquitetura do Sistema

O projeto segue o padrão de **Arquitetura em Camadas (Controller-Service-Repository)**, garantindo que a lógica de negócio esteja isolada da infraestrutura:

- **Controllers**: Gerenciam o protocolo HTTP (Request/Response).
- **Services**: Onde reside a inteligência do negócio e a lógica de auditoria.
- **Repositories**: Isolam o acesso aos bancos de dados (Prisma e MongoDB Driver).

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados.
- Node.js v18+.

### Instalação
1. **Subir os Containers:**
   ```bash
   docker-compose up -d

2. **Instalar Dependências:**
    npm install

3. **Configurar o Banco de Dados (Migrations):**
    npx prisma migrate dev

4. **Rodar o Servidor:**
    npm run dev


A API estará rodando em http://localhost:3333


📡 Endpoints DisponíveisMétodoRotaDescrição
- GET /health - Verifica a saúde da API e dos Bancos.
- POST /transactions - Cria uma transação financeira (Salva no Postgres).
- GET /transactions - Lista todas as transações (Busca no Postgres).
- GET /logs - Retorna o histórico de erros (Busca no MongoDB).
- GET /logs/report - Relatório de erros agrupados (Aggregation MongoDB).


🧠 Decisões de Engenharia & Troubleshooting
Durante o desenvolvimento, apliquei conceitos de SRE (Site Reliability Engineering) para garantir a estabilidade:

Estratégia de Log: Transações válidas são persistidas no PostgreSQL. Erros de validação ou exceções são desviados para o MongoDB. Isso evita a poluição de índices no banco transacional e facilita o monitoramento.

Resiliência na Inicialização: A aplicação utiliza o padrão Fail-Fast, impedindo a subida do servidor caso a conexão com os bancos de dados falhe.

Troubleshooting de Versão: Identificada instabilidade do Prisma v7 em ambiente WSL/Docker, optei pelo downgrade estratégico para a v6.2.1 (LTS), garantindo a entrega e estabilidade do projeto.

Desenvolvido por Peterson Bersanetti
