ARG DATABASE_URL

FROM node:18-alpine AS builder

COPY package.json .

RUN npm install

COPY . .

ENV DATABASE_URL=${DATABASE_URL}

RUN npm run generate:db

RUN npm run build

FROM node:18-alpine AS production

COPY --from=builder ./package.json .
COPY --from=builder ./dist ./dist
COPY --from=builder ./node_modules ./dist/node_modules
COPY --from=builder ./src/infra/prisma/migrations ./dist/infra/prisma/ 
COPY --from=builder ./src/infra/prisma/schema.prisma ./dist/infra/prisma/

EXPOSE 3000