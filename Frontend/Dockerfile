# Use an official Node runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 5173

# Install additional libraries (if required)
RUN npm install -g vite

# Enable live reload and hot reloading
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
