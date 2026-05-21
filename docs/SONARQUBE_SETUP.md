# Configuração do SonarQube Cloud com GitHub Actions

## Pré-requisitos

- Organização já criada no [SonarQube Cloud](https://sonarcloud.io)
- Repositório hospedado no GitHub
- Acesso de administrador ao repositório e à organização no SonarCloud

---

## Visão Geral

Este repositório possui dois serviços com cobertura de testes:

| Serviço | Localização | Test Runner | Script de cobertura |
|---------|-------------|-------------|---------------------|
| **Backend (API)** | `skumanagement/api/v1` | Jest | `npm run test:coverage` |
| **Frontend (skuview)** | `skuview` | Vitest | `vitest run --coverage` |

A estratégia adotada é criar um **projeto SonarCloud por serviço** e um **workflow GitHub Actions dedicado por serviço**, ambos disparados em pull requests e pushes para `main`.

---

## Etapa 1 — Criar os Projetos no SonarCloud

### 1.1 Acessar a organização

1. Acesse [sonarcloud.io](https://sonarcloud.io) e faça login.
2. No menu superior, clique no nome da sua organização.
3. Clique em **"Analyze new project"**.

### 1.2 Importar o repositório do GitHub

1. Selecione **"Import from GitHub"**.
2. Localize o repositório `skumanager-tech-challenger`.
3. Clique em **"Set Up"**.

> O SonarCloud vai perguntar qual método de análise usar — escolha **"With GitHub Actions"** para ambos os projetos.

### 1.3 Criar o projeto para o Backend

Na tela de setup com GitHub Actions, anote:
- **Organization Key** (ex.: `seu-org-name`)
- **Project Key** para o backend (defina como `skumanager-api` ou use o gerado automaticamente)

> Você pode criar projetos adicionais manualmente em: **Organization > "+" > "Analyze new project"**

### 1.4 Criar o projeto para o Frontend

Repita o processo acima e defina o Project Key como `skumanager-skuview` (ou o nome gerado).

> Ao final desta etapa você terá dois projetos no SonarCloud:
> - `skumanager-api`
> - `skumanager-skuview`

---

## Etapa 2 — Configurar o Token no GitHub

### 2.1 Gerar o token no SonarCloud

1. No SonarCloud, vá em **My Account > Security**.
2. Em **"Generate Tokens"**, informe um nome (ex.: `github-actions-token`) e clique em **"Generate"**.
3. **Copie o token gerado** — ele não será exibido novamente.

### 2.2 Adicionar o secret ao repositório GitHub

1. No GitHub, acesse o repositório > **Settings > Secrets and variables > Actions**.
2. Clique em **"New repository secret"**.
3. Crie o secret:
   - **Name:** `SONAR_TOKEN`
   - **Value:** cole o token copiado no passo anterior
4. Clique em **"Add secret"**.

---

## Etapa 3 — Criar os arquivos `sonar-project.properties`

### 3.1 Backend (`skumanagement/api/v1`)

Crie o arquivo `skumanagement/api/v1/sonar-project.properties`:

```properties
sonar.projectKey=skumanager-api
sonar.organization=<SUA_ORG_KEY>

sonar.projectName=SKU Manager - API
sonar.projectVersion=1.0

sonar.sources=src
sonar.tests=src/tests
sonar.exclusions=src/infra/prisma/**,dist/**,node_modules/**

sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=src/tests/**,src/infra/prisma/**
```

> Substitua `<SUA_ORG_KEY>` pela chave da organização exibida no SonarCloud.

### 3.2 Frontend (`skuview`)

Crie o arquivo `skuview/sonar-project.properties`:

```properties
sonar.projectKey=skumanager-skuview
sonar.organization=<SUA_ORG_KEY>

sonar.projectName=SKU Manager - Frontend
sonar.projectVersion=0.1

sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts,**/*.spec.tsx,**/*.test.ts,**/*.test.tsx
sonar.exclusions=.next/**,node_modules/**,public/**

sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=**/*.spec.*,**/*.test.*
```

---

## Etapa 4 — Habilitar cobertura de código

### 4.1 Backend — Jest com cobertura LCOV

O script `test:coverage` já existe no `package.json`. Para garantir que o Jest gere o relatório no formato LCOV, adicione a configuração de `coverageReporters` no `jest.config.js`:

```js
// skumanagement/api/v1/jest.config.js
const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  collectCoverageFrom: ["src/**/*.ts", "!src/tests/**", "!src/infra/prisma/**"],
  coverageReporters: ["lcov", "text-summary"],
};
```

### 4.2 Frontend — Vitest com cobertura LCOV

Instale o provider de cobertura:

```bash
cd skuview
npm install --save-dev @vitest/coverage-v8
```

Atualize o `vitest.config.ts` para incluir a configuração de coverage:

```ts
// skuview/vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    name: "skuview-test",
    setupFiles: ['./vitest-setup.js'],
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text-summary'],
      exclude: ['**/*.spec.*', '**/*.test.*', '.next/**', 'node_modules/**'],
    },
  },
})
```

Adicione o script de cobertura no `package.json` do frontend:

```json
"test:coverage": "vitest run --coverage"
```

---

## Etapa 5 — Criar os GitHub Actions Workflows

Crie a pasta `.github/workflows/` na raiz do repositório caso não exista.

### 5.1 Workflow do Backend

Crie o arquivo `.github/workflows/sonar-api.yml`:

```yaml
name: SonarCloud — API

on:
  push:
    branches:
      - main
    paths:
      - 'skumanagement/api/v1/**'
  pull_request:
    types: [opened, synchronize, reopened]
    paths:
      - 'skumanagement/api/v1/**'

jobs:
  sonarcloud:
    name: Análise de Qualidade — Backend
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: skumanagement/api/v1

    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: skumanagement/api/v1/package-lock.json

      - name: Instalar dependências
        run: npm ci

      - name: Executar testes com cobertura
        run: npm run test:coverage

      - name: Análise SonarCloud
        uses: SonarSource/sonarcloud-github-action@master
        with:
          projectBaseDir: skumanagement/api/v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### 5.2 Workflow do Frontend

Crie o arquivo `.github/workflows/sonar-skuview.yml`:

```yaml
name: SonarCloud — Frontend

on:
  push:
    branches:
      - main
    paths:
      - 'skuview/**'
  pull_request:
    types: [opened, synchronize, reopened]
    paths:
      - 'skuview/**'

jobs:
  sonarcloud:
    name: Análise de Qualidade — Frontend
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: skuview

    steps:
      - name: Checkout do repositório
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: skuview/package-lock.json

      - name: Instalar dependências
        run: npm ci

      - name: Executar testes com cobertura
        run: npm run test:coverage

      - name: Análise SonarCloud
        uses: SonarSource/sonarcloud-github-action@master
        with:
          projectBaseDir: skuview
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

> `fetch-depth: 0` é obrigatório — sem ele o SonarCloud não consegue calcular métricas de novo código corretamente.

---

## Etapa 6 — Configurar o Quality Gate no SonarCloud

### 6.1 Usar o Quality Gate padrão (Sonar Way)

O SonarCloud aplica automaticamente o **Sonar Way** Quality Gate, que verifica:

| Métrica | Condição padrão |
|---------|-----------------|
| Coverage em novo código | ≥ 80% |
| Duplicação em novo código | ≤ 3% |
| Security Hotspots revisados | 100% |
| Bugs, Vulnerabilidades, Code Smells | Rating ≥ A |

### 6.2 Criar um Quality Gate customizado (opcional)

1. No SonarCloud, vá em **Organization > Quality Gates**.
2. Clique em **"Create"** e dê um nome (ex.: `skumanager-gate`).
3. Adicione as condições desejadas (ex.: Coverage on New Code ≥ 70%).
4. Associe o gate ao projeto: vá no projeto > **Administration > Quality Gate** > selecione o gate criado.

### 6.3 Habilitar o status check no GitHub

Para que o Quality Gate **bloqueie merges** em PRs com falha:

1. No SonarCloud, acesse o projeto > **Administration > Quality Gate**.
2. Confirme que a opção **"Prevent merge when the Quality Gate fails"** está ativa (padrão no SonarCloud).
3. No GitHub, acesse **Settings > Branches > Branch protection rules**.
4. Edite (ou crie) a regra para `main`:
   - Marque **"Require status checks to pass before merging"**
   - Adicione o status check `SonarCloud Code Analysis` na lista
5. Salve.

---

## Etapa 7 — Validar a configuração

1. Crie um branch a partir de `main` e faça um commit qualquer em `skumanagement/api/v1` ou `skuview`.
2. Abra um Pull Request para `main`.
3. Observe a aba **"Checks"** do PR — o workflow de SonarCloud deve aparecer.
4. Após a análise, o SonarCloud publica um **comentário automático no PR** com o resultado do Quality Gate.
5. Se o Quality Gate falhar, o merge ficará bloqueado até que os problemas sejam corrigidos.

---

## Estrutura de arquivos criados

```
skumanager-tech-challenger/
├── .github/
│   └── workflows/
│       ├── sonar-api.yml              ← Workflow do Backend
│       └── sonar-skuview.yml          ← Workflow do Frontend
├── skumanagement/
│   └── api/
│       └── v1/
│           ├── jest.config.js         ← Atualizado com coverageReporters
│           └── sonar-project.properties  ← Criado
└── skuview/
    ├── vitest.config.ts               ← Atualizado com coverage
    ├── package.json                   ← Adicionado script test:coverage
    └── sonar-project.properties       ← Criado
```

---

## Referências

- [SonarCloud — GitHub Actions Integration](https://docs.sonarcloud.io/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/)
- [SonarSource GitHub Action](https://github.com/SonarSource/sonarcloud-github-action)
- [Quality Gates — SonarCloud](https://docs.sonarcloud.io/improving/quality-gates/)
- [Vitest Coverage — v8 provider](https://vitest.dev/guide/coverage.html)
- [Jest Coverage Configuration](https://jestjs.io/docs/configuration#coveragereporters-arraystring)
