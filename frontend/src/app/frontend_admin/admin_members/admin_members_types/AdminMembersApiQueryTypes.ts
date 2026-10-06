// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface FetchMembersParams {
  search?: string;
  status?: string;
  branchId?: string;
  expiryFilter?: string;
  gender?: string;
  plan?: string;
  page?: number;
  limit?: number;
}
