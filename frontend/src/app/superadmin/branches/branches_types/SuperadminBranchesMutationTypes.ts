// RESPONSIBILITY: Defines named mutation inputs for Superadmin branch lifecycle changes.
export interface SuperadminBranchMutationTarget {
  id: string;
  idempotencyKey: string;
}
export interface SuperadminBranchUpdateInput {
  id: string;
  body: Record<string, unknown>;
  idempotencyKey: string;
}

export type SuperadminBranchStatusSelection = 'ALL' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
