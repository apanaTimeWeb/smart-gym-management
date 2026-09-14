// RESPONSIBILITY: Centralized API client and auth utilities for the GymSmart ERP frontend.
// Provides: apiFetch() (with auto token injection, tenant header, and 401 refresh logic),
// getUser() (reads user from non-HttpOnly cookie), and logout() (clears session and redirects).
// Every API call in every module MUST go through apiFetch — never call fetch() directly.
/**
 * GymSmart API Client
 * Centralised fetch wrapper for all backend API calls.
 * Base URL: http://localhost:5000/api/v1
 */

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: PaginationMeta;
  error?: unknown;
  statusCode?: number;
}


import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { StatusCodes } from 'http-status-codes';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { getMockResponse } from '@/lib/mock_data';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// ─── User Helper (reads from non-HttpOnly cookie set by server) ───────────────

export function getUser(): { id?: string; name: string; email: string; role: string; tenantId?: string } | null {
  if (typeof window === 'undefined') return null;
  const c = document.cookie.split(';').find(x => x.trim().startsWith('gymsmart_user='));
  if (!c) return null;
  try { return JSON.parse(decodeURIComponent(c.split('=').slice(1).join('='))); } catch { return null; }
}

export async function logout() {
  if (typeof window !== 'undefined') {
    localStorage.clear();
    sessionStorage.clear();
  }
  await fetch(AuthUrlConfig.PROXY_API.LOGOUT, { method: 'POST' });
  window.location.replace(AuthUrlConfig.PAGES.LOGIN);
}

// ─── Core Fetch ───────────────────────────────────────────────────────────────

interface FetchOptions<Z extends z.ZodTypeAny = z.ZodTypeAny> extends RequestInit {
  auth?: boolean;
  responseSchema?: Z;
  dataSchema?: Z;
}

export async function apiFetch<T = unknown, Z extends z.ZodTypeAny = z.ZodTypeAny>(
  path: string,
  options: FetchOptions<Z> = {}
): Promise<T> {
  const { auth = true, responseSchema, dataSchema, ...rest } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(rest.headers as Record<string, string>),
  };

  // Inject Tenant ID for Multi-Tenancy
  if (typeof window !== 'undefined') {
    const user = getUser();
    if (user && user.tenantId) {
      headers['x-tenant-id'] = user.tenantId;
    } else {
      // Fallback to checking a specific cookie if tenantId is stored separately
      const tenantCookie = document.cookie.split(';').find(x => x.trim().startsWith('x-tenant-id='));
      if (tenantCookie) {
        headers['x-tenant-id'] = tenantCookie.split('=')[1]?.trim() || '';
      }
    }
  }

  // Token is in HttpOnly cookie — read via Next.js proxy to avoid CORS/exposure
  if (auth) {
    const tokenRes = await fetch(AuthUrlConfig.PROXY_API.TOKEN).catch(() => null);
    if (tokenRes?.ok) {
      const { token } = await tokenRes.json();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
  }
  let finalRes!: Response;

  // ── Network call with automatic mock fallback ──────────────────────────────
  try {
    finalRes = await fetch(`${BASE_URL}${path}`, { ...rest, headers });

    if (finalRes.status === StatusCodes.UNAUTHORIZED && auth) {
      // Attempt to refresh the token
      const refreshRes = await fetch(AuthUrlConfig.PROXY_API.REFRESH, { method: 'POST' });
      if (refreshRes.ok) {
        const { accessToken } = await refreshRes.json();
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
          finalRes = await fetch(`${BASE_URL}${path}`, { ...rest, headers });
        }
      } else {
        // Refresh failed, session genuinely expired
        await fetch(AuthUrlConfig.PROXY_API.LOGOUT, { method: 'POST' });
        window.location.replace(AuthUrlConfig.PAGES.LOGIN);
        throw new Error('Session expired. Please login again.');
      }
    }
  } catch (_networkErr) {
    // Backend is offline — fall back to hardcoded mock data
    const mock = getMockResponse(path);
    return mock as T;
  }

  const json = await finalRes.json();

  if (!finalRes.ok) {
    const errorMsg = json.message || `API Error: ${finalRes.status}`;
    if (typeof window !== 'undefined') {
      toast.error(errorMsg, { id: errorMsg });
    }
    throw new Error(errorMsg);
  }

  if (responseSchema) {
    const parseResult = responseSchema.safeParse(json);
    if (!parseResult.success) {
      console.error('Zod Validation Error (response):', parseResult.error);
      const errorMsg = 'Invalid data received from server.';
      if (typeof window !== 'undefined') toast.error(errorMsg, { id: 'zod-error' });
      throw new Error(errorMsg);
    }
    return parseResult.data as T;
  }

  if (dataSchema && json.data !== undefined && json.data !== null) {
    const parseResult = dataSchema.safeParse(json.data);
    if (!parseResult.success) {
      console.error('Zod Validation Error (data payload):', parseResult.error);
      const errorMsg = 'Invalid data payload received from server.';
      if (typeof window !== 'undefined') toast.error(errorMsg, { id: 'zod-error-data' });
      throw new Error(errorMsg);
    }
    json.data = parseResult.data;
  }

  return json as T;
}




