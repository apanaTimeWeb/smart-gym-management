# Admin Layout — Forbidden

- Do not import sibling business feature state, API clients, fixtures, or business handlers.
- Do not move feature-specific business logic into the role shell.
- Do not create feature-local mock data in the shell.
- Do not replace the centralized WebSocket boundary with direct sockets in feature components.
- Do not use the shell as a cross-feature business abstraction.
