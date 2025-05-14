FROM node:20-alpine AS builder

# Install necessary build dependencies
RUN apk add --no-cache python3 make g++ libc6-compat git

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install node-gyp globally
RUN npm install -g node-gyp

# Set environment for node-gyp and build from source
ENV PYTHON=/usr/bin/python3
ENV npm_config_build_from_source=true

# Install dependencies
RUN npm install

# Install global tools
RUN npm install -g typescript ts-node

# Explicitly rebuild bcrypt
RUN npm rebuild bcrypt

# Copy application code
COPY . .

# Rebuild bcrypt specifically
RUN npm rebuild bcrypt

FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app . 

EXPOSE 3000

CMD ["npm", "run", "dev"] 