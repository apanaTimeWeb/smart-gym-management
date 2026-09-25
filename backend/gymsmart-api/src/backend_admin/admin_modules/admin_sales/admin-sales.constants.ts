// RESPONSIBILITY: Defines finite Admin domain values used by DTO, domain and persistence contracts.
// FLOW: DTO validation → domain logic → repository → database constraint.

export enum AdminSalesStatus {
  ACTIVE = 'ACTIVE',
  PAID = 'PAID',
  PENDING = 'PENDING',
}

