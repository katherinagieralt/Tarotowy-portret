import pino from 'pino';

// Determine if in development
const isDevelopment = process.env.NODE_ENV === 'development';
const logLevel = process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info');

/**
 * Pino logger instance with environment-specific configuration
 * - Development: Pretty-printed colorized output for CLI
 * - Production: Structured JSON for log aggregation services
 */
export const logger = pino(
  {
    level: logLevel,
    // Add custom serializers for common objects
    serializers: {
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
      err: pino.stdSerializers.err,
    },
  },
  isDevelopment
    ? // Development: Pretty printing with colors
      pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          singleLine: false,
          messageFormat: '{levelLabel} - {msg}',
        },
      })
    : // Production: Structured JSON output
      undefined
);

/**
 * Logger methods wrapper for convenience
 * Provides type-safe logging across the application
 */
export const log = {
  /**
   * Log informational message
   * @example log.info({ leadId: '123' }, 'Lead created');
   */
  info: (data: Record<string, unknown>, message: string) => {
    logger.info(data, message);
  },

  /**
   * Log error
   * @example log.error({ error }, 'Failed to send email');
   */
  error: (data: Record<string, unknown>, message: string) => {
    logger.error(data, message);
  },

  /**
   * Log warning
   * @example log.warn({ deprecated: true }, 'Old API endpoint');
   */
  warn: (data: Record<string, unknown>, message: string) => {
    logger.warn(data, message);
  },

  /**
   * Log debug information
   * @example log.debug({ query }, 'Prisma query executed');
   */
  debug: (data: Record<string, unknown>, message: string) => {
    logger.debug(data, message);
  },

  /**
   * Log performance metrics
   * @example log.perf({ duration: 234 }, 'API request completed');
   */
  perf: (data: Record<string, unknown>, message: string) => {
    logger.info({ ...data, type: 'perf' }, message);
  },

  /**
   * Log API request
   * @example log.request({ method: 'POST', path: '/api/contact', duration: 45 }, 'Request completed');
   */
  request: (data: Record<string, unknown>, message: string) => {
    logger.info({ ...data, type: 'request' }, message);
  },

  /**
   * Log database operation
   * @example log.db({ model: 'Lead', operation: 'create', duration: 12 }, 'Prisma query');
   */
  db: (data: Record<string, unknown>, message: string) => {
    logger.info({ ...data, type: 'database' }, message);
  },
};

/**
 * Middleware function to log HTTP requests
 * @example
 * // In app/api/route.ts
 * import { requestLoggerMiddleware } from '@/lib/logger';
 * export async function POST(req) {
 *   requestLoggerMiddleware(req, 'POST', '/api/contact');
 *   // ... rest of handler
 * }
 */
export function requestLoggerMiddleware(
  req: { headers: Headers; method?: string },
  method: string,
  path: string
) {
  const ip =
    req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  log.request(
    {
      method,
      path,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
    },
    `Incoming ${method} ${path}`
  );
}
