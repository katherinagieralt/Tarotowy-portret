# ⚡ Performance Checklist

- [ ] **Image Optimization:** Use Next.js `<Image>` component for automatic format selection (WebP/AVIF) and resizing.
- [ ] **Font Loading:** Use `next/font` to optimize font loading and prevent Cumulative Layout Shift (CLS).
- [ ] **Bundle Size:** Audit external dependencies. Avoid large libraries if a lighter alternative exists.
- [ ] **Caching:** Leverage Next.js App Router caching mechanisms (fetch cache, ISR).
- [ ] **Lazy Loading:** Dynamically import heavy components or non-critical sections below the fold.
- [ ] **Database Queries:** Ensure Prisma queries only select required fields and use proper indexes.
