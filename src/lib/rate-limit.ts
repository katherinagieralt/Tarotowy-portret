/**
 * Simple in-memory rate limiter for contact form submissions
 * Limits: 3 submissions per hour per IP
 */

interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  const oneHourAgo = now - 3600000; // 1 hour in milliseconds

  for (const [ip, entry] of rateLimitMap.entries()) {
    entry.timestamps = entry.timestamps.filter((t) => t > oneHourAgo);
    if (entry.timestamps.length === 0) {
      rateLimitMap.delete(ip);
    }
  }
}, 300000); // 5 minutes

/**
 * Check if IP has exceeded rate limit (3 requests per hour)
 * Returns true if allowed, false if rate limited
 */
export function checkRateLimit(ip: string): boolean {
  const MAX_REQUESTS = 3;
  const TIME_WINDOW = 3600000; // 1 hour in milliseconds
  const now = Date.now();

  // Get or create entry
  let entry = rateLimitMap.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    rateLimitMap.set(ip, entry);
  }

  // Remove old timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < TIME_WINDOW);

  // Check if limit exceeded
  if (entry.timestamps.length >= MAX_REQUESTS) {
    console.warn(`Rate limit exceeded for IP: ${ip}`);
    return false;
  }

  // Add current request timestamp
  entry.timestamps.push(now);
  return true;
}

/**
 * Get remaining requests for an IP
 * Useful for debugging/monitoring
 */
export function getRateLimitStatus(ip: string): {
  remaining: number;
  resetAt: Date | null;
} {
  const MAX_REQUESTS = 3;
  const TIME_WINDOW = 3600000;
  const now = Date.now();

  const entry = rateLimitMap.get(ip);
  if (!entry) {
    return { remaining: MAX_REQUESTS, resetAt: null };
  }

  // Remove old timestamps
  const validTimestamps = entry.timestamps.filter((t) => now - t < TIME_WINDOW);
  const remaining = Math.max(0, MAX_REQUESTS - validTimestamps.length);
  const resetAt = validTimestamps.length > 0
    ? new Date(validTimestamps[0] + TIME_WINDOW)
    : null;

  return { remaining, resetAt };
}
