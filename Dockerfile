# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /auth-ms

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install bcypt in Linux
# RUN npm install bcrypt

# Install app dependencies
RUN npm install


# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 5000

# Start the app
CMD [ "npm", "start" ]