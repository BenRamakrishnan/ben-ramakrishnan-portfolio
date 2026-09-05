---
name: motion-framer
description: Animation choreographing guidelines using Motion (Framer Motion). Best practices for layout transitions, spring physics, gesture handling, and reduced motion compliance.
---

# Motion & Framer Guidelines

1. **Spring Kinematics**: Prefer spring transitions (`stiffness: 300, damping: 25`) over linear easings for natural organic feel.
2. **Layout Animations**: Use `layoutId` for smooth shared-element transitions (e.g. active tab indicators).
3. **Hardware Acceleration**: Only animate `transform` (x, y, scale, rotate) and `opacity`. Never animate `width`, `height`, `margin`, or `padding` directly.
4. **Accessibility**: Always respect `prefers-reduced-motion` using `useReducedMotion()`.
