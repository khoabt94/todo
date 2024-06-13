FROM node:21-alpine

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5173

CMD npm run dev