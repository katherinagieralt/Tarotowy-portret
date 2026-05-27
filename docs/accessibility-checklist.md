# ♿ Accessibility (a11y) Checklist

Every feature MUST pass this checklist before being merged.

- [ ] **Semantic HTML:** Correct use of `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<button>`, `<a>`.
- [ ] **Keyboard Navigation:** All interactive elements must be accessible via the `Tab` key. Focus rings must be visible.
- [ ] **ARIA Attributes:** Use `aria-label`, `aria-expanded`, `aria-hidden`, etc., where visual context is insufficient for screen readers.
- [ ] **Color Contrast:** Text must meet WCAG AA standards (minimum contrast ratio of 4.5:1 for normal text).
- [ ] **Alt Text:** All `<img>` tags must have descriptive `alt` attributes (or empty `alt=""` for purely decorative images).
- [ ] **Form Labels:** Every `<input>` must have an associated `<label>`.
- [ ] **Motion Preferences:** Respect `prefers-reduced-motion` for complex animations.
