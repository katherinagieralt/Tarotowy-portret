#!/bin/bash

# Setup script for Prisma 7.8.0 + PostgreSQL
# Handles DATABASE_URL from .env
# Cleans cache and initializes MCP agents

set -e

# Trap errors
trap 'echo "❌ Setup failed at line $LINENO"; exit 1' ERR

echo "🚀 Tarotowy Portret Setup (Prisma 7)"
echo ""

# Step 1: Check/create .env
echo "📝 Step 1: Checking .env..."
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "   ✓ Created .env from .env.example"
  else
    echo "   ✗ .env.example not found"
    exit 1
  fi
else
  echo "   ✓ .env exists"
fi
echo ""

# Step 2: Load DATABASE_URL
echo "🔐 Step 2: Loading DATABASE_URL from .env..."
export $(grep DATABASE_URL .env | xargs)
echo "   ✓ DATABASE_URL loaded"
echo ""

# Step 3: Clean cache
echo "🧹 Step 3: Cleaning build cache..."
rm -rf .next/ || true
rm -rf node_modules/.cache/ || true
echo "   ✓ Cache cleaned"
echo ""

# Step 4: Install dependencies
echo "📦 Step 4: Installing dependencies..."
npm ci
echo "   ✓ Dependencies installed"
echo ""

# Step 5: Generate Prisma Client
echo "🔧 Step 5: Generating Prisma Client..."
npx prisma generate
echo "   ✓ Prisma Client generated"
echo ""

# Step 6: Validate schema
echo "✨ Step 6: Validating schema..."
npx prisma validate
echo "   ✓ Schema is valid"
echo ""

# Step 7: Build MCP agents
echo "🤖 Step 7: Preparing MCP agents..."
for agent_dir in mcp_agents/*/; do
  if [ -f "${agent_dir}package.json" ]; then
    agent_name=$(basename "$agent_dir")
    echo "   Building: $agent_name"
    (cd "$agent_dir" && npm ci --ignore-scripts 2>/dev/null && npm run build 2>/dev/null) || echo "   ⚠ Skipped: $agent_name (not buildable)"
  fi
done
echo "   ✓ MCP agents prepared"
echo ""

# Step 8: Run migrations
echo "🗄️  Step 8: Running database migrations..."
echo "   (Ensure PostgreSQL is running via: docker compose up db)"
npx prisma migrate dev --name init_leads_table || echo "   ⚠ Migration skipped (database may not be running)"
echo "   ✓ Done"
echo ""

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. docker compose up"
echo "  2. http://localhost:3000"
echo "  3. npm run prisma:studio"
echo ""
