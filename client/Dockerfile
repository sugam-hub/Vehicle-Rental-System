FROM node:18.12.0-alpine

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json ./

USER root
RUN chown -R app:app /app
USER app

RUN npm install

RUN ls -la /app

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]
