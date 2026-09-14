# Theme Portability Contract

This module relies on the following global CSS variables being defined in the host application's `globals.css` or theme provider:

## Core Colors
- `--bg-page`: Main page background
- `--bg-card`: Container and widget background
- `--bg-sidebar`: Navigation sidebar background
- `--bg-input`: Form input and dropdown backgrounds

## Text Colors
- `--text-primary`: Primary headings and body text
- `--text-secondary`: Muted text, labels, and descriptions
- `--text-inverse`: Text color on primary buttons (typically white/black depending on theme)

## Brand & Status Colors
- `--primary`: Primary brand color (buttons, active states, focus rings)
- `--primary-hover`: Hover state for primary actions
- `--primary-subtle`: Low opacity background for primary elements (e.g. active nav items)
- `--success`: Success states, positive trends (e.g., green)
- `--warning`: Warnings, pending states (e.g., yellow/amber)
- `--danger`: Destructive actions, errors, negative trends (e.g., red)

## Structural
- `--border`: Standard border color for cards, dividers, and inputs

> **Note**: To ensure dark mode compatibility, do not hardcode Tailwind hex colors (e.g., `bg-blue-500`) in this module. Always use the semantic aliases mapped in `tailwind.config.ts`.
