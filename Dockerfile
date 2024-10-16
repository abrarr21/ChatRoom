FROM node:20-alpine

WORKDIR /backend

COPY package.json pnpm-lock.yaml /backend/

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm prisma generate --schema=./backend/prisma/schema.prisma 
RUN pnpm prisma migrate deploy --schema=./backend/prisma/schema.prisma

EXPOSE 6969

CMD [ "pnpm", "dev" ]
