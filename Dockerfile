FROM node:19-alpine

COPY package.json /app/
COPY IT202_Final_Project-main /app/

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]
