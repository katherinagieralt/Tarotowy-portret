# local-skills-mcp — Node.js TypeScript MCP Server
# Multi-stage build for minimal production image

# ── Build Stage ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /build

# Install dependencies (ignore prepare/husky scripts - we build manually)
COPY package*.json ./
RUN npm ci --ignore-scripts

# Build TypeScript
COPY tsconfig.json ./
COPY src/ ./src/

RUN npx tsc

# ── Runtime Stage ────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy built artifacts and skills
COPY --from=builder /build/dist ./dist
COPY skills/ ./skills/

ENV NODE_ENV=production
ENV MCP_SERVER_PORT=3002

EXPOSE 3002

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD pgrep node || exit 1

# Run the MCP server (stdio mode)
CMD ["node", "dist/index.js"]
