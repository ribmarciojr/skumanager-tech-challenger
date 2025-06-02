# 📦 Skumanager

> Projeto composto por três serviços: banco de dados, frontend e backend, focado na gestão de SKUs.

---

## 📚 Sumário

- [🚀 Tecnologias](#-tecnologias)
- [📦 Instalação](#-instalação)
- [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
- [🧪 Testes](#-testes)
- [📁 Convenções e Padrões](#-convenções-e-padrões)
- [📝 Licença](#-licença)

---

## 🚀 Tecnologias

- [PostgreSQL](https://www.postgresql.org/)
- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/skumanager.git

# Acesse a pasta
cd sku-project

# Instale as dependências do frontend
cd skuview
npm install

# Instale as dependências do backend
cd ../skumanagement
npm install

# Executando o backend

npm start

# Executando o frontend

npm run dev
```

## Banco de dados (UML)

![imagem em diagrama uml das tabelas do banco](image.png)

## Back-end

![imagem de cone em diagrama clean arch representando as camadas do back-end](image-1.png)

├── skumanagement/        # Backend Express + TypeScript, Clean Architecture
│   ├── domain/           # Entidades de dominio;
│   ├── application/      # Casos de uso e regras de negócio;
│   ├── infra/            # Banco de dados, logs e libs externas;
│   └── http/             # Controladores, camada de requisição e respostas ao protocolo http;
    └── main/             # Configuração de framework e inicialização do socket.

## Front-end

├── skuview/              # Frontend Next.js 15 + TypeScript
│   ├── app/
│   ├── pages/
│   ├── components/
│   ├── hooks/
│   ├── interfaces/
│   ├── errors/
│   └── enums/