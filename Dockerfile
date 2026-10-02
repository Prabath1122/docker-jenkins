
FROM node:22-bookworm-slim

WORKDIR /app

# Install OpenSSL for Prisma's Linux query engine
RUN apt-get update && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining project files
COPY . .

# Generate Prisma Client for the container's platform
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "dev"]