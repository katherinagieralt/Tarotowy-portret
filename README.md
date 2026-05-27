# 🚀 Project Name - AI-Powered Premium Next.js Platform

Welcome to the central repository for our AI-assisted, high-performance web platform. This project is built upon a modern, highly opinionated stack designed for extreme maintainability, scalability, and premium user experiences.

## 🌟 Project Philosophy

1. **Simplicity First:** Avoid overengineering. Prefer clarity over abstraction.
2. **Modular Architecture:** Build small, reusable, independent components.
3. **Accessibility (a11y) is Mandatory:** If it's not accessible, it's not finished.
4. **Premium UX/UI:** Mobile-first, semantic HTML, and highly polished interactions (animations/motion).
5. **Production Safety:** Strict type safety, input validation, and deployment checklists.
6. **AI-Optimized:** Code and documentation are structured to be easily parsed and maintained by AI agents (like Antigravity and MCP servers).

## 🛠️ Stack Overview

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS 4 (No inline styles, no CSS modules unless justified)
- **Database ORM:** Prisma
- **Authentication:** NextAuth.js
- **Containerization:** Docker & Docker Compose
- **AI Tooling:** Model Context Protocol (MCP) Agents

## 📂 Folder Structure

```text
/
├── app/                  # Next.js App Router pages, layouts, and API routes
├── components/           # Reusable modular UI components (separated by domain/feature)
├── docs/                 # Detailed architectural and standard documentation
├── lib/                  # Utility functions, shared logic, Prisma client
├── mcp_agents/           # AI Model Context Protocol agent configurations
├── prisma/               # Database schema and migrations
├── public/               # Static assets (images, fonts, etc.)
├── scripts/              # Utility scripts for setup and deployment
├── styles/               # Global styles (Tailwind configuration)
└── ...config files       # Docker, ESLint, TypeScript, Next.js configs
```

## 💻 Setup Instructions

1. **Clone & Install Dependencies:**
   ```bash
   npm install
   ```
2. **Environment Variables:**
   Copy `.env.example` to `.env` and fill in the necessary values.
   ```bash
   cp .env.example .env
   ```
3. **Database Setup:**
   Ensure Docker is running and spin up the database.
   ```bash
   docker-compose up -d
   npx prisma generate
   npx prisma db push
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

1. **Plan:** Review `AI_RULES.md` and relevant docs before starting a feature.
2. **Branch:** Create a feature branch (`feature/your-feature-name`).
3. **Develop:** Use AI assistance, adhering strictly to the `docs/` standards.
4. **Test:** Ensure all accessibility and performance checklists are met.
5. **Review:** PR must pass code review focusing on modularity, types, and security.

## 📝 Coding Conventions

- **TypeScript Everywhere:** `any` is forbidden.
- **Tailwind Only:** No inline styles (`style={{...}}`).
- **Server Components:** Prefer Server Components by default; only use `'use client'` when state/effects are needed.
- **Naming:** `camelCase` for variables, `PascalCase` for components, `kebab-case` for file names (e.g., `user-profile.tsx`).

## 🤖 AI Workflow Instructions

This repository is designed for AI collaboration. AI agents MUST read `AI_RULES.md` and the `docs/` directory before making architectural changes.
- Provide explicit context to the AI (e.g., "Review docs/frontend-standards.md before writing this component").
- Leverage MCP agents for automated code reviews, database migrations, and testing.

## 🚀 Deployment Instructions

We use a containerized deployment strategy via Docker.
1. Build the production image: `docker-compose -f docker-compose.prod.yml build`
2. Run database migrations on the CI/CD pipeline.
3. Deploy the container.
(See `docs/deployment-checklist.md` for the full procedure).

## 🤝 Contribution Standards

- All PRs must include a summary of changes and AI-assisted review logs.
- Code must pass ESLint, Prettier, and TypeScript checks.
- Zero accessibility violations in Lighthouse CI.

## ❓ Troubleshooting

- **Prisma sync issues:** Run `npx prisma generate` after any schema changes.
- **Docker port conflicts:** Check `.env.docker` or `docker-compose.yml` to remap ports.
- **Tailwind not applying:** Ensure Tailwind v4 setup in `app/globals.css` is correct and caches are cleared.
