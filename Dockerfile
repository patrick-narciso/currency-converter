FROM node:15.14.0-alpine3.12 AS builder
RUN apk add --no-cache python2 make g++

WORKDIR /opt/app-root/src

COPY . .

RUN ls -lA && npm ci && npm run build

FROM node:15.14.0-alpine3.12

WORKDIR /opt/app-root/src

COPY --from=builder /opt/app-root/src/dist dist

COPY package*.json ./
RUN npm ci --only=production

ENV HOST=0.0.0.0 PORT=3001

EXPOSE 3001/tcp

CMD ["node","dist/src"]

