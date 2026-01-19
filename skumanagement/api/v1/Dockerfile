# ARG DATABASE_URL

# FROM node:20-alpine AS builder

# COPY package.json .

# RUN npm install

# COPY . .

# ENV DATABASE_URL=${DATABASE_URL}

# RUN npm run generate:db

# RUN npm run build

# FROM node:20-alpine AS production

# COPY --from=builder ./package.json .
# COPY --from=builder ./dist ./dist
# COPY --from=builder ./node_modules ./dist/node_modules
# COPY --from=builder ./src/infra/prisma/migrations ./dist/infra/prisma/ 
# COPY --from=builder ./src/infra/prisma/schema.prisma ./dist/infra/prisma/

# EXPOSE 3000

# ============================================================================
# STAGE 1: BUILD - Compilação TypeScript e geração do Prisma Client
# ============================================================================
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (otimização de cache)
COPY package*.json ./

# Instalar TODAS as dependências (incluindo devDependencies para build)
RUN npm ci --include=dev

# Copiar código fonte
COPY . .

# ✅ Debug: Mostrar informações do ambiente de build
RUN echo "=== BUILD STAGE DEBUG ===" && \
    echo "Node.js: $(node --version)" && \
    echo "NPM: $(npm --version)" && \
    echo "TypeScript: $(npx tsc --version)" && \
    echo "Prisma CLI: $(npx prisma --version)" && \
    echo "=========================="

# Gerar Prisma Client (necessário antes da compilação TypeScript)
RUN npm run generate:db

# Compilar TypeScript para JavaScript
RUN npm run build

# Verificar se a compilação foi bem-sucedida
RUN echo "=== BUILD VERIFICATION ===" && \
    ls -la dist/ && \
    echo "Build completed successfully!" && \
    echo "=========================="

# ============================================================================
# STAGE 2: PRODUCTION - Runtime otimizado apenas com JavaScript
# ============================================================================
FROM node:20-alpine AS production

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar APENAS dependências de produção (sem devDependencies)
RUN npm ci --only=production && \
    npm cache clean --force

# Copiar arquivos JavaScript compilados do stage anterior
COPY --from=builder /app/dist ./dist

# Copiar arquivos essenciais do Prisma para runtime
COPY --from=builder /app/src/infra/prisma/schema.prisma ./dist/infra/prisma/
COPY --from=builder /app/src/infra/prisma/migrations ./dist/infra/prisma/migrations

# Copiar Prisma Client gerado (necessário para runtime)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# ✅ Debug: Verificar conteúdo da imagem de produção
RUN echo "=== PRODUCTION STAGE DEBUG ===" && \
    echo "Node.js: $(node --version)" && \
    echo "Production dependencies:" && \
    npm list --depth=0 --production 2>/dev/null || true && \
    echo "Dist contents:" && \
    find dist -type f -name "*.js" | head -10 && \
    echo "Prisma client:" && \
    ls -la node_modules/.prisma/ 2>/dev/null || echo "Prisma client not found" && \
    echo "=============================="

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Alterar ownership dos arquivos
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expor porta da aplicação
EXPOSE 3000

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar a aplicação (usando arquivos JS compilados)
CMD ["npm", "run", "start:production"]