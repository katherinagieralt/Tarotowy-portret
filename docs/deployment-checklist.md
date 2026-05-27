# 🚢 Deployment Checklist

- [ ] **Environment Variables:** Ensure all required `.env` variables are configured in the production environment.
- [ ] **Database Migrations:** Run `prisma migrate deploy` to apply schema changes to the production DB.
- [ ] **Build Check:** Run `npm run build` locally to catch any compilation or type errors.
- [ ] **Type Check:** Run `npm run typecheck` to ensure no TypeScript errors exist.
- [ ] **Linting:** Run `npm run lint` to enforce code quality rules.
- [ ] **Docker:** Ensure the Docker image builds successfully using `docker-compose -f docker-compose.prod.yml build` (or your specific prod compose file).
- [ ] **Rollback Plan:** Verify that the previous Docker image is available for quick rollback if needed.
