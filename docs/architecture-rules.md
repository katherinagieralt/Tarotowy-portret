# 🏛️ Architecture Rules

## 📌 Philosophy
- **Clean Architecture:** Separation of concerns. UI components should not know about database queries.
- **Modularity:** Keep files small and focused. One component/function per file where possible.
- **Scalability:** Design patterns should easily accommodate future feature expansions without massive refactoring.

## 📂 Project Structure
- `app/`: Routing layer (Next.js 16 App Router). Only Server Components, Layouts, and Route Handlers here.
- `components/`: UI layer. Divided into domains (e.g., `components/auth`, `components/ui` for primitives).
- `lib/`: Business logic, utility functions, external API wrappers, and Prisma client instantiation.
- `prisma/`: Database schema, migrations, and seed scripts.

## 🚀 Component Architecture
- **Server vs. Client:** Default to React Server Components (RSC). Only use `'use client'` at the leaf nodes of the component tree when interactivity (hooks, state, DOM access) is strictly required.
- **Dumb/Smart Components:** Separate data-fetching (Smart/Container) from rendering (Dumb/Presentational).

## 🔄 State Management Philosophy
- **Server State:** Handled by Next.js App Router (fetch cache, Server Actions, Server Components).
- **URL State:** Prefer storing shareable state (search params, filters, pagination) in the URL.
- **Local Client State:** Use standard React hooks (`useState`, `useReducer`) for ephemeral UI state (dropdowns, modals).
- **Global Client State:** Avoid complex global state managers (Redux) unless absolutely necessary. Rely on React Context for simple global state (e.g., Theme, Auth session).
