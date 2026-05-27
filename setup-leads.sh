#!/bin/bash

# Setup script for Lead management system
# Runs Prisma migrations and verifies database connection

set -e

echo "🚀 Setting up Lead Management System..."
echo ""

# Step 1: Generate Prisma Client
echo "📦 Step 1: Generating Prisma Client..."
npx prisma generate
echo "   ✓ Prisma Client generated"
echo ""

# Step 2: Run migrations
echo "🗄️  Step 2: Running database migrations..."
npx prisma migrate dev --name init_leads_table 2>/dev/null || npx prisma migrate deploy
echo "   ✓ Migrations completed"
echo ""

# Step 3: Verify database connection
echo "🔗 Step 3: Verifying database connection..."
npx prisma db execute --stdin <<EOF
SELECT 1 AS connection_test;
EOF
echo "   ✓ Database connection verified"
echo ""

# Step 4: Show Lead table schema
echo "📋 Step 4: Lead table schema:"
npx prisma db execute --stdin <<EOF
\d leads;
EOF
echo ""

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start services: docker compose up"
echo "  2. Test form: curl -X POST http://localhost:3000/api/contact"
echo "  3. View submissions: npm run prisma:studio"
echo ""
