FROM node:alpine

WORKDIR /app

COPY . .

RUN apk add docker

RUN npm i --production

CMD node .