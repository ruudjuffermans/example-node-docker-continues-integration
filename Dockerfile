FROM node:20
WORKDIR /app
COPY app/package*.json .
RUN npm install
COPY app/src/ ./src/
EXPOSE 3001
CMD [ "npm", "run", "start"]