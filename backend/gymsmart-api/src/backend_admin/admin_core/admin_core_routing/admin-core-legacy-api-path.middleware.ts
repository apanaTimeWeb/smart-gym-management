// RESPONSIBILITY: Rewrites legacy frontend Admin API paths into the canonical /api/v1 namespace without changing feature semantics.
// FLOW: Incoming /admin or /api/admin â†’ rewrite â†’ /api/v1/admin â†’ Nest route.
import type { NextFunction, Request, Response } from 'express';

export function AdminCoreLegacyApiPathMiddleware(request: Request, _response: Response, next: NextFunction): void {
  const url = request.url;
  if (url.startsWith('/api/v1/')) return next();
  if (url.startsWith('/api/admin/')) request.url = `/api/v1${url.slice('/api'.length)}`;
  else if (url === '/api/admin') request.url = '/api/v1/admin';
  else if (url.startsWith('/admin/')) request.url = `/api/v1${url}`;
  else if (url === '/admin') request.url = '/api/v1/admin';
  next();
}
