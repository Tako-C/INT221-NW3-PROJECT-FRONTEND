FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Change the ownership of the application directory to 'node' user
RUN chown -R node:node /app

# Switch to 'node' user
USER root

# Install Vite globally
RUN npm install -g vite@latest

# Switch back to 'node' user
USER node

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
