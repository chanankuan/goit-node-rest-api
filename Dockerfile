FROM node

WORKDIR /app

COPY ./ ./

RUN npm install

EXPOSE 4040

CMD ["node", "./server.js"]