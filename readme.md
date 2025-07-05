# 📦 Skumanager | Controle de SKU'S

> Permite a gestão de SKU's unitários.

---

Esse projeto representa uma mini-plataforma para gestão de SKU's unitários, como parte de um
desafio técnico.

## 📚 Sumário

- [🚀 Requisitos](#-requisitos)
- [📦 Instalação](#-instalação)
- [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
- [🧪 Testes](#-testes)
- [📁 Convenções e Padrões](#-convenções-e-padrões)
- [📝 Licença](#-licença)

---

## 🚀 Requisitos

Interpretador node.js versão maior ou igual a 20.0.

## 📦 Instalação

```bash
# Clone o repositório com os arquivos e pastas
git clone https://github.com/seu-usuario/skumanager.git

# Acesse a pasta clonada
cd skumanager-tech-challenger

# [BANCO DE DADOS]
# Para criar uma instância do banco pré-configurada:
docker compose -f ./docker-compose-dev.yml up

# Caso deseje utilizar outro serviço consulte as variáveis de ambiente da instância em:
./docker-compose-dev.yml

# Instale as dependências do backend
cd ../skumanagement
npm install

# Instale as dependências do frontend
cd skuview
npm install
# npm run dev


localhost:3001/sku/list
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
