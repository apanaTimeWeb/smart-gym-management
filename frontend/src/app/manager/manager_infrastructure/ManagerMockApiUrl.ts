// RESPONSIBILITY: Converts module-owned API contract paths into the versioned MSW/browser request URL shape.
// MOCK-ONLY INFRASTRUCTURE: Production API clients continue to receive service-relative paths from module URL configs.
//
// CRITICAL: MSW relative paths ('/api/v1/...') resolve to the current page origin (localhost:3000).
// apiFetch calls the real API base URL (localhost:5000). To intercept cross-origin requests,
// MSW handlers MUST use absolute URLs matching the actual API base.
const MANAGER_API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export function managerMockApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${MANAGER_API_BASE}${normalizedPath}`;
}

/** Removes a query string when a URL-config function is used to describe an MSW route pattern. */
