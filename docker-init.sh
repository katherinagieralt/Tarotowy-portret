#!/bin/bash
# Docker Quick Start Script for Tarotowy Portret
# This script automates the 3-step Docker setup

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         Tarotowy Portret - Docker Quick Start               ║"
echo "║     Next.js 16 + React 19 + Tailwind CSS + Prisma + Piny     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}→${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Step 1: Prepare Environment
echo ""
print_step "STEP 1: Preparing Environment..."
echo ""

if [ ! -f ".env.docker" ]; then
    print_error ".env.docker not found"
    exit 1
fi

# Check if .env exists, if not copy from template
if [ ! -f ".env" ]; then
    print_warning ".env not found, creating from .env.docker..."
    cp .env.docker .env
    print_success ".env created"
else
    print_success ".env already exists"
fi

# Verify required files
files=("Dockerfile.dev" "docker-compose.yml" ".dockerignore" "prisma/schema.prisma")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        print_success "✓ $file found"
    else
        print_error "$file not found"
        exit 1
    fi
done

echo ""
print_success "All required files present!"

# Step 2: Start Services
echo ""
print_step "STEP 2: Starting Docker Services..."
echo ""

if ! command -v docker &> /dev/null; then
    print_error "Docker not found! Please install Docker."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose not found! Please install Docker Compose."
    exit 1
fi

print_warning "Building images and starting services..."
print_warning "This may take 1-2 minutes on first run..."
echo ""

docker compose up --build -d

if [ $? -eq 0 ]; then
    print_success "All services started!"
else
    print_error "Failed to start services"
    exit 1
fi

# Step 3: Verify Services
echo ""
print_step "STEP 3: Verifying Services..."
echo ""

# Wait for services to be ready
print_warning "Waiting for services to be healthy (30 seconds)..."
for i in {1..30}; do
    if docker compose exec -T postgres pg_isready -U postgres &> /dev/null; then
        print_success "PostgreSQL is ready!"
        break
    fi
    echo -n "."
    sleep 1
done

# Wait for Next.js
sleep 5

if docker compose ps | grep -q "tarot-nextjs.*Up"; then
    print_success "Next.js is running!"
else
    print_error "Next.js is not running"
    docker compose logs nextjs | tail -20
    exit 1
fi

echo ""
print_success "All services are running!"

# Display service information
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  🎉 Setup Complete! 🎉                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo -e "${GREEN}📍 Service URLs:${NC}"
echo "   • Next.js Application:    ${BLUE}http://localhost:3000${NC}"
echo "   • Adminer (Database UI):  ${BLUE}http://localhost:8080${NC}"
echo "   • PostgreSQL:             ${BLUE}localhost:5432${NC}"
echo ""

echo -e "${GREEN}🔧 Useful Commands:${NC}"
echo "   • View logs:              ${BLUE}docker compose logs -f nextjs${NC}"
echo "   • Database UI:            ${BLUE}docker compose exec postgres psql -U postgres${NC}"
echo "   • Prisma Studio:          ${BLUE}docker compose exec nextjs npx prisma studio${NC}"
echo "   • Stop services:          ${BLUE}docker compose down${NC}"
echo "   • Restart services:       ${BLUE}docker compose restart${NC}"
echo ""

echo -e "${GREEN}🎨 Piny Integration:${NC}"
echo "   • Open any .tsx file"
echo "   • Right-click → Edit in Piny"
echo "   • Hot-reload works automatically!"
echo ""

echo -e "${GREEN}📖 Documentation:${NC}"
echo "   See DOCKER_SETUP.md for complete guide"
echo ""

# Optional: Open services in browser (if using macOS/Linux)
if command -v open &> /dev/null; then
    echo -e "${YELLOW}Opening services in browser...${NC}"
    sleep 2
    open http://localhost:3000
    sleep 1
    open http://localhost:8080
fi

echo ""
print_success "Docker setup complete! Happy coding! 🚀"
