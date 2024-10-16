FROM node:18-alpine

WORKDIR /reactapp

COPY package.json pnpm-lock.yaml /reactapp/

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 5173

CMD [ "pnpm", "dev" ]
