# Stage 1: build the React app into static files (dist/).
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve only the built files. Node and the source code are not part of the final image.
# nginx-unprivileged runs as a non-root user and therefore listens on port 8080 instead of 80.
FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
