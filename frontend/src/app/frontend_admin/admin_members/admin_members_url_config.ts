// admin_members_url_config.ts
// Owned by: frontend_admin/admin_members feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_MEMBERS_ROUTES = {
  root: '/admin/members' as const,
  detail: (memberId: string) => `/admin/members?memberId=${encodeURIComponent(memberId)}` as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_MEMBERS_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_MEMBERS_BASE_URL = '/admin/members' as const;
export const ADMIN_MEMBERS_SUMMARY_URL = '/admin/members/summary' as const;
export const ADMIN_MEMBERS_LIST_URL = '/admin/members/list' as const;
export const ADMIN_MEMBERS_DETAIL_URL = (memberId: string) => `/admin/members/${encodeURIComponent(memberId)}` as const;
export const ADMIN_MEMBERS_EXPORT_URL = '/admin/members/export' as const;

export const ADMIN_MEMBERS_URLS = {
  branchReference: ADMIN_MEMBERS_BRANCH_REFERENCE_URL,
  base: ADMIN_MEMBERS_BASE_URL,
  summary: ADMIN_MEMBERS_SUMMARY_URL,
  list: ADMIN_MEMBERS_LIST_URL,
  detail: ADMIN_MEMBERS_DETAIL_URL,
  export: ADMIN_MEMBERS_EXPORT_URL,
} as const;

export const ADMIN_MEMBERS_API = ADMIN_MEMBERS_URLS;
