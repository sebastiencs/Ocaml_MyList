FROM node:12.14.0-alpine

WORKDIR /app
COPY . .
RUN npm install --silent

CMD ["npm", "run", "expose"]
