# Use the official Node.js image as a base
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies and update npm
RUN npm install -g npm@11.5.2 && npm install

# Copy the rest of your application code
COPY . .

# Start the application
CMD [ "npm", "start" ]