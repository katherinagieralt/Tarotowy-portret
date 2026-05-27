# 🎨 Frontend & UI Standards

## 💎 Premium UI/UX
- **Animations & Motion:** Use Framer Motion or Tailwind's built-in transitions for micro-interactions (hover states, modal entry/exit). Animations should be subtle, smooth (60fps), and purposeful.
- **Responsive Design:** Mobile-first approach. Ensure pixel-perfect rendering across all viewports (sm, md, lg, xl, 2xl).
- **Consistency:** Follow the established design system tokens in `tailwind.config.ts` or root styles.

## 🖌️ Tailwind CSS Rules
- **Exclusive Use:** Use Tailwind for all styling. No CSS modules, no inline styles.
- **Utility Grouping:** Group classes logically: Layout > Spacing > Typography > Colors > Effects.
- **Custom Values:** Avoid arbitrary values (e.g., `w-[123px]`) unless absolutely necessary. Extend the Tailwind config instead.
- **Dynamic Classes:** Use utilities like `clsx` or `tailwind-merge` to safely combine classes dynamically.

## 🧩 Component Standards
- **Props:** Define explicit TypeScript interfaces for all component props.
- **Naming:** PascalCase for component files (e.g., `Button.tsx`).
- **Exports:** Use named exports over default exports for components to ensure refactoring safety (except for Next.js pages/layouts which require default exports).
