FROM node:16-alpine

RUN npm install -g ts-node

WORKDIR /usr/src/index

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm","start"]