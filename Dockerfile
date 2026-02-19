FROM public.ecr.aws/docker/library/node:16-buster

# Create app directory
WORKDIR /app

# Install app dependencies
RUN npm -g install gatsby-cli@3

COPY package*.json ./

# Remove existing lock file to ensure fresh dependency resolution
RUN rm -f package-lock.json && npm install --legacy-peer-deps

# Bundle app source
COPY . .

# Build static files
RUN npm run build

# Serve on port 8080
CMD ["gatsby", "serve", "--verbose", "--prefix-paths", "-p", "8080", "--host", "0.0.0.0"]
