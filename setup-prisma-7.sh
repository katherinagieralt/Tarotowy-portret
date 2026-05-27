#!/bin/bash

# Setup script for Prisma 7.8.0 with PostgreSQL
# Handles new schema.prisma format (no url field) + prisma.config.ts

set -e

echo "🚀 Setting up Prisma 7 Environment..."
echo ""

# Step 1: Verify environment
echo "🔍 Step 1: Verifying DATABASE_URL..."
if [ -z "$DATABASE_URL" ]; then
  echo "   ℹ DATABASE_URL not set, using default from .env"
  if [ -f .env ]; then
    export $(grep DATABASE_URL .env | xargs)
  else
    echo "   ⚠ .env file not found. Create it with DATABASE_URL first."
    exit 1
  fi
else
  echo "   ✓ DATABASE_URL is set"
fi
echo ""

# Step 2: Verify prisma.config.ts exists
echo "📋 Step 2: Checking prisma.config.ts..."
if [ -f prisma.config.ts ]; then
  echo "   ✓ prisma.config.ts found"
else
  echo "   ✗ prisma.config.ts not found. Creating it..."
  cat > prisma.config.ts <<'EOF'
import { defineConfig } from '@prisma/internals';

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
EOF
  echo "   ✓ prisma.config.ts created"
fi
echo ""

# Step 3: Generate Prisma Client
echo "📦 Step 3: Generating Prisma Client..."
npx prisma generate
echo "   ✓ Prisma Client generated"
echo ""

# Step 4: Run migrations
echo "🗄️  Step 4: Running database migrations..."
npx prisma migrate dev --name init_leads_table 2>&1 || {
  echo "   ℹ Migration already exists or skipping creation..."
  npx prisma migrate deploy 2>&1
}
echo "   ✓ Migrations completed"
echo ""

# Step 5: Verify schema
echo "✨ Step 5: Schema validation..."
npx prisma validate
echo "   ✓ Schema is valid"
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start services: docker compose up"
echo "  2. Test form: http://localhost:3000/contact"
echo "  3. View data: npm run prisma:studio"
echo ""
