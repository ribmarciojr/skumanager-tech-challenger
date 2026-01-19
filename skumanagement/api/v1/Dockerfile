FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

RUN npm run generate:db

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && \
    npm cache clean --force

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src/infra/prisma/schema.prisma ./dist/infra/prisma/
COPY --from=builder /app/src/infra/prisma/migrations ./dist/infra/prisma/migrations

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "run", "start:production"]