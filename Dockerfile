# Use the official Node.js image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists)

COPY package*.json ./

# copy project files
COPY . .

# Install dependencies using npm ci for a clean installation
RUN npm ci

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]

