// RESPONSIBILITY: Defines finite Admin domain values used by DTO, domain and persistence contracts.
// FLOW: DTO validation → domain logic → repository → database constraint.

export enum AdminMembersStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  FROZEN = 'FROZEN',
}

