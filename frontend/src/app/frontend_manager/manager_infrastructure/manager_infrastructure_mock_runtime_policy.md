# Manager Mock Runtime Policy

Module-owned MSW fixtures and handlers are the frontend-first development/test transport. The Manager browser bootstrap is intentionally disabled in production builds by default so production uses the real backend API path.

Therefore: development/test pages are expected to render completely from Manager-owned MSW data; production requires the corresponding real backend endpoints to exist. No component may add fake business fallbacks to mask a missing production backend.
