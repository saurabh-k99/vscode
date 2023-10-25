FROM node:18.15.0

WORKDIR /webapps

RUN apt-get update -y && apt-get install build-essential g++ libx11-dev libxkbfile-dev libsecret-1-dev libkrb5-dev python-is-python3 -y

COPY package.json .

RUN yarn

COPY . .

RUN ./install.sh

CMD ["npm", "run", "start-container"]