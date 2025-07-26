# 🏗️ Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy only what's needed from auth service
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Install full dependencies including @deepak-jewellers/common from npm registry
RUN npm install

# Build the TypeScript project
RUN npm run build

# 🛠️ Stage 2: Create a lightweight image for production
FROM node:18-alpine

WORKDIR /app

# Copy production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy compiled code from build step
COPY --from=builder /app/dist ./dist

# Run the server
CMD ["node", "dist/index.js"]
