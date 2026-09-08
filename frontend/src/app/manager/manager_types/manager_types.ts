// RESPONSIBILITY: Module-level shared TypeScript types for the Manager role.
// Only types shared across 2+ manager modules live here. Module-specific types stay in their own _types/ folder.

export interface ManagerUser {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  branchId?: string;
}

export type ManagerFetchState = 'idle' | 'loading' | 'success' | 'error';

/** Standard API response envelope — mirrors backend Rule 28. */
export interface ManagerApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
