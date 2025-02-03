FROM --platform=linux/amd64 node:18-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install --legacy-peer-deps --force

RUN npm install serve -g
#RUN npm install pm2 -g

COPY . .

#RUN pm2 --name ../ start npm -- run dev

#COPY .env.production.local .env

RUN npm run build

#FROM --platform=linux/amd64 nginx:alpine
#COPY --from=build /app/build /usr/share/nginx/html

# needed this to make React Router work properly 
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/conf.d

# Expose port 80 for HTTP Traffic 
EXPOSE 80

# start the nginx web server

#CMD ["pm2", "status"]
CMD ["serve","-s","build"]
