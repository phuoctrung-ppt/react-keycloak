
# Start React-App
# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the public and src directories to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Set the environment variable to serve the React app
ENV NODE_ENV=production

# Expose the desired port (default is 3000 for create-react-app)
EXPOSE 3000

# Start the React app
CMD ["npm", "run" ,"dev"]
