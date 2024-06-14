# Use an official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /Backend

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000 to the host machine
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
