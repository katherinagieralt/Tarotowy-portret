# agent-a11y — Go MCP Accessibility Agent
# Multi-stage build for minimal production image

# ── Build Stage ──────────────────────────────────────────
FROM golang:1.24-alpine AS builder

RUN apk add --no-cache git ca-certificates

WORKDIR /build

# Allow auto-download of newer Go toolchain if required by go.mod
ENV GOTOOLCHAIN=auto

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# Build binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /bin/agent-a11y ./cmd/agent-a11y

# ── Runtime Stage ────────────────────────────────────────
FROM alpine:3.21

RUN apk add --no-cache ca-certificates chromium

WORKDIR /app

COPY --from=builder /bin/agent-a11y /usr/local/bin/agent-a11y

# Chromium flags for headless container
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
ENV CHROMIUM_FLAGS="--no-sandbox --disable-gpu --headless"

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD pgrep agent-a11y || exit 1

# Run in MCP server mode (stdio)
ENTRYPOINT ["agent-a11y"]
CMD ["mcp", "serve"]
