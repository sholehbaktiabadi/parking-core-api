# Create node image v18.14.2
FROM node:20.16.0-slim

# Create app directory
WORKDIR /app

# Copy file to /app directory
COPY . /app

# install and build
RUN  npm install && npm run build

EXPOSE 5001

# run service
CMD ["npm", "run", "start"]