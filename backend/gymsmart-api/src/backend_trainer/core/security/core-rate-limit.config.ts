// RESPONSIBILITY: Defines centralized Redis-backed request rate-limit tiers.
// FLOW: Route classification → tier config → Redis counter window.


export const CORE_RATE_LIMIT_TIERS = {
  PUBLIC_AUTH: { max: 5, windowSeconds: 60 },
  AUTHENTICATED_READ: { max: 100, windowSeconds: 60 },
  MUTATION: { max: 60, windowSeconds: 60 },
  EXPORT: { max: 2, windowSeconds: 60 },
} as const;
