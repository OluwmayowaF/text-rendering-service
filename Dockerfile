# pull official base image

FROM debian:11-slim

RUN apt-get update && apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - 

RUN apt-get install -y nodejs

RUN apt-get update || : && apt-get install python -y

RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n latest


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 5000

CMD ["npm", "run", "dev"]

