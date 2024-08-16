FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "run", "dev"]