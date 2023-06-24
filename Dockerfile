FROM node as build

ENV HOME=/home/app
WORKDIR $HOME

COPY package.json ./
RUN npm install -g npm@8.19.3
RUN npm install --legacy-peer-deps

COPY . ./
CMD ["npm", "start"]


#FROM node as build
 #
 #ENV HOME=/home/app
 #WORKDIR $HOME
 #
 #COPY package.json ./
 #RUN npm install -g npm@8.19.3
 #RUN npm install --legacy-peer-deps
 #COPY . ./
 #
 #RUN npm run build
 #
 #
 #FROM nginx
 #COPY --from=build /home/app/build /usr/share/nginx/html
 #RUN rm /etc/nginx/conf.d/default.conf
 #COPY nginx/nginx.conf /etc/nginx
 #EXPOSE 80
 #CMD ["nginx", "-g", "daemon off;"]