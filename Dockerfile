# Multi-stage build for Next.js 16 with Turbopack + Sharp Image Optimization

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies for Sharp (image processing) and Prisma
RUN apk add --no-cache python3 make g++ openssl

# Copy dependency files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./

# Install dependencies with Sharp prebuilt binaries
RUN npm ci

# Copy source and configs
COPY src ./src
COPY app ./app
COPY public ./public
COPY prisma ./prisma
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

# Generate Prisma Client
RUN npx prisma generate

# Build application (with Turbopack optimization)
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies for Sharp and Prisma
RUN apk add --no-cache cairo jpeg libpng giflib pixman openssl

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy Prisma config and schema
COPY prisma ./prisma

# Copy built artifacts from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder /app/public ./public

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

# Set NODE_ENV and start
ENV NODE_ENV=production
CMD ["npm", "start"]
