// RESPONSIBILITY: Converts module-owned API contract paths into the versioned MSW/browser request URL shape.
// MOCK-ONLY INFRASTRUCTURE: Production API clients continue to receive service-relative paths from module URL configs.
const MANAGER_API_PREFIX = '/api/v1';

export function managerMockApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${MANAGER_API_PREFIX}${normalizedPath}`;
}

/** Removes a query string when a URL-config function is used to describe an MSW route pattern. */
