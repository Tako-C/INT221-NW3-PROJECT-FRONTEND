# Use the official Node.js image as the base image
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Change the ownership of the application directory to 'node' user
RUN chown -R node:node /app

# Switch to 'node' user
USER root

# Install Vite globally
RUN npm install -g vite@latest

# Switch back to 'node' user
USER node

# Build the frontend
RUN npm run build

# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the built app from the 'builder' stage to the nginx web root directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
