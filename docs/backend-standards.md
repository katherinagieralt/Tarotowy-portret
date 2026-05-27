# ⚙️ Backend & API Standards

## 📡 API Architecture
- **Route Handlers:** Use Next.js 16 Route Handlers (`app/api/.../route.ts`) for external webhooks or non-UI data fetching.
- **Server Actions:** Prefer Server Actions for form submissions and mutations directly from UI components.
- **RESTful Principles:** Use standard HTTP methods (GET, POST, PUT, DELETE, PATCH) and proper status codes.

## 🛡️ Security & Validation
- **Input Validation:** All incoming data MUST be validated. Use a schema validation library like Zod.
- **Authentication:** Protect sensitive routes and Server Actions using NextAuth session checks.
- **Rate Limiting:** Implement rate limiting on sensitive API endpoints (e.g., login, form submissions).

## 💾 Database Access
- **ORM:** Use Prisma for all database interactions.
- **Type Safety:** Leverage Prisma's generated types across the codebase.
- **Performance:** Avoid N+1 query problems. Use Prisma's `include` or `select` appropriately.
- **Separation:** Do not call `prisma` directly inside UI components. Create data access functions in `lib/data/` or `lib/services/`.
