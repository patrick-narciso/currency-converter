FROM node:15.14.0-alpine3.12

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@4.0.3 -g

COPY . ./

EXPOSE 3000/tcp

CMD ["npm", "start"]