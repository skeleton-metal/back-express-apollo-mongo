FROM node:12.16.1-alpine3.9

RUN apk add bash

# Create app directory
WORKDIR /app

RUN npm install pm2 -g

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 80 443 43554

CMD ["pm2-runtime", "start", "--env", "production", "process.yml"]
