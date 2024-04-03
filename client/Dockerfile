FROM node:20 as builder

RUN npm install -g @angular/cli@17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "5000"]
