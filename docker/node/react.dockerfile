FROM node:lts-bullseye

# USER root

# RUN install -d -m 0755 -o www-data -g www-data /home/www-data
# RUN chown -R www-data:www-data /home/www-data

WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install --silent
# RUN npm install react-scripts -g --silent

RUN chmod 777 -R . 

COPY . .
# Expose port
EXPOSE 3000

RUN apt-get update
# RUN apt-get upgrade -y

RUN apt-get install -y nano mc

CMD ["npm", "start"]