// RESPONSIBILITY: Defines finite Admin domain values used by DTO, domain and persistence contracts.
// FLOW: DTO validation → domain logic → repository → database constraint.

export enum AdminBranchesStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  EXPIRED = 'EXPIRED',
}

