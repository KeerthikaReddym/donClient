# Stage 1: Build Stage
FROM node:14 as build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build Tailwind CSS and other assets
RUN npm run build

# Stage 2: Runtime Stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the built assets from the build stage
COPY --from=build /app/build .

# Expose the port
EXPOSE 80

# Default command to start the server
CMD ["nginx", "-g", "daemon off;"]
