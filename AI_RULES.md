# 🤖 AI Collaboration Rules

This document serves as the absolute source of truth for all AI agents (including Antigravity, GitHub Copilot, and other LLM assistants) operating within this codebase.

## 🎯 Primary Directive
**Do not guess.** If a pattern or standard is defined in the `docs/` folder, you MUST follow it. If a requirement is ambiguous, prompt the user for clarification before generating complex code.

## 📚 Required Context
Before implementing features, fixing bugs, or refactoring, you must analyze the relevant guidelines:
- **Architecture:** `docs/architecture-rules.md`
- **Frontend/UI:** `docs/frontend-standards.md`
- **Backend/API:** `docs/backend-standards.md`
- **Quality Assurance:** Checklists for [Accessibility](docs/accessibility-checklist.md), [Performance](docs/performance-checklist.md), and [Deployment](docs/deployment-checklist.md).

## 🛑 Hard Constraints for AI
1. **Never write `any` in TypeScript.** Always type interfaces/types accurately.
2. **Never use inline styles or CSS modules.** Rely exclusively on Tailwind CSS 4 utility classes.
3. **Never bypass input validation.** All API routes and Server Actions must validate inputs (e.g., using Zod).
4. **Never leak secrets.** Do not commit or log `.env` values, API keys, or database credentials.
5. **Always implement semantic HTML and a11y.** Use correct ARIA labels, semantic tags (`<nav>`, `<article>`, `<button>`), and keyboard navigation.

## 🛠️ MCP Agent Responsibilities
- **Code Review Agent:** Enforces rules from this document and `docs/`.
- **Database Agent:** Handles Prisma schema migrations and type synchronization.
- **Testing Agent:** Validates unit/integration tests and accessibility compliance.
