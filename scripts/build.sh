#!/bin/bash
# Production build script with proper Prisma setup

# Generate Prisma Client before build
echo "Generating Prisma Client..."
npx prisma generate

# Build Next.js
echo "Building Next.js..."
NODE_ENV=production npm run build

echo "Build complete!"
