FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]

EXPOSE 3000
