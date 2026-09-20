// RESPONSIBILITY: Owns every internal and backend URL used by the Admin Branches module.
export const AdminBranchesUrlConfig = {
  root: '/admin/branches',
  api: {
    base: '/admin/branches/fetchBranches',
    detail: (branchId: string) => `/admin/branches/${encodeURIComponent(branchId)}`,
  },
} as const;
