# Trainer Attendance — Theme Contract

## Global token source
This module consumes the canonical global design system. Feature JSX must use semantic Tailwind classes; raw hex/RGB colors and arbitrary color values are forbidden.

## Consumed semantic tokens
- `--bg-card`
- `--bg-input`
- `--bg-overlay`
- `--bg-page`
- `--border`
- `--danger-bg`
- `--danger-text`
- `--focus-ring`
- `--info-bg`
- `--info-text`
- `--primary`
- `--primary-subtle`
- `--shadow-card`
- `--skeleton-base`
- `--success-bg`
- `--success-text`
- `--surface-highlight`
- `--text-on-primary`
- `--text-primary`
- `--text-secondary`
- `--warning-bg`
- `--warning-text`

## Feature-specific visual rules
- Status: success
- Status: warning
- Status: danger
- Status: info

## Forbidden patterns
- `bg-[#...]`, `text-[#...]`, `border-[#...]`, `ring-[#...]`
- `bg-[var(--...)]`, `text-[var(--...)]`, `border-[var(--...)]`, `ring-[var(--...)]` in JSX
- Raw RGBA/RGB/hex theme colors when a semantic token exists
- Hardcoded feature business color registries in global UI folders

## Motion and surfaces
- Use `motion-safe:` for animations/transitions that respect reduced-motion requirements.
- Use `bg-card`, `bg-overlay`, `bg-popover`, and semantic shadow tokens for surfaces according to their documented structural purpose.
