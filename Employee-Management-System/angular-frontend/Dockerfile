# Stage 1: Build Angular app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/angular-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
