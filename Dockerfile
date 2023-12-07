# Use the official Node.js image as the base image
FROM node:21.4.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Expose the port that Next.js will run on
EXPOSE 3000

# Command to start your Next.js application
CMD ["npm", "run", "dev"]
