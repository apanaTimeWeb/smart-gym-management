# Manager Frontend-First Mocking Contract

The Manager role uses module-owned MSW fixtures and handlers as the temporary backend when real Manager endpoints are unavailable. Browser data consumers must call the normal module API clients; they must not import fixtures directly.

## Runtime path

Browser development/test: Manager layout → `ManagerMswBrowserBootstrap` → `setupWorker` → module-owned handlers → module-owned fixtures → module API client → TanStack Query → UI.

Production: Manager UI → module API client → real backend. MSW must not start in production.

## Host application prerequisite

The host Next.js application must expose the MSW service worker at `/mockServiceWorker.js` (normally generated once with the MSW CLI into the host `public/` folder). This file is intentionally not placed inside `manager/` because Next serves static public assets from the application root.

## Ownership

Each Manager feature owns its API contract, types, Zod schemas, fixtures, and handlers. `manager_mocks/` contains only Manager-level MSW infrastructure and registration.
