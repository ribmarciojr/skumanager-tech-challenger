ARG DATABASE_URL

FROM node:18-alpine

COPY package.json .

RUN npm install

COPY . .

ENV DATABASE_URL ${DATABASE_URL}

RUN npm run generate:db

EXPOSE 3000