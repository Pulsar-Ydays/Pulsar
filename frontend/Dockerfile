FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

ENV HOSTNAME=0.0.0.0

CMD ["npm", "run", "dev"] 