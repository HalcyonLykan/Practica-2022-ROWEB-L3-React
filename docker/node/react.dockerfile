FROM node:lts-bullseye

USER root

RUN install -d -m 0755 -o www-data -g www-data /home/www-data
RUN chown -R www-data:www-data /home/www-data

WORKDIR /var/www

ENV PATH /var/www/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

RUN ls -la
RUN tail package.json

COPY . /var/www

RUN apt-get update
# RUN apt-get upgrade -y

RUN apt-get install -y nano mc

CMD ["npm", "start"]