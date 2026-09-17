// RESPONSIBILITY: URL configuration for the Admin Members module.
export const AdminMembersUrlConfig = {
  root: '/admin/members',
  detail: (memberId: string) => `/admin/members?memberId=${encodeURIComponent(memberId)}`,
  api: {
    branchReference: '/admin/branches/fetchBranches',
    base: '/admin/members',
    detail: (memberId: string) => `/admin/members/${encodeURIComponent(memberId)}`,
  },
} as const;
