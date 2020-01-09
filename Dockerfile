FROM node:10

WORKDIR /app

COPY . .

EXPOSE 8000
CMD [ "yarn", "run", "dev" ]
