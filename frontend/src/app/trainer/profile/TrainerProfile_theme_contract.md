# Theme Contract for PROFILE Module (Rule 4)

This module MUST adhere to the globally defined CSS variables in `src/app/globals.css` (e.g., `--background`, `--foreground`, `--primary`, `--card`, `--border`).

## Strict Rules
1. **No Hardcoded Hex/RGB:** All components must use Tailwind classes like `bg-card`, `text-foreground`, `border-border`.
2. **Glassmorphism/Transparency:** Use `bg-primary/10` or similar alpha modifiers for subtle backgrounds; never hardcode light/dark specific colors.
3. **Animations:** All animations must be prefixed with `motion-safe:`.
