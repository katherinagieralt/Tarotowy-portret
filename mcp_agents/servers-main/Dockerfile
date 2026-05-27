# servers-main — Official MCP Servers (memory, filesystem, sequential-thinking)
# Multi-stage build for the npm workspaces monorepo

# ── Build Stage ──────────────────────────────────────────
FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /build

# Copy root package files and workspace sources
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src/

# Install all dependencies (ignore prepare scripts - we build manually)
RUN npm install --ignore-scripts

# Build all workspaces
RUN npm run build

# ── Runtime Stage ────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Copy everything from builder (monorepo needs the structure)
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/src ./src

ENV NODE_ENV=production
ENV MCP_SERVER_PORT=3003

EXPOSE 3003

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD pgrep node || exit 1

# Run the memory server as the primary MCP server (stdio mode)
CMD ["node", "src/memory/dist/index.js"]
