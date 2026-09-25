// RESPONSIBILITY: Defines finite Admin domain values used by DTO, domain and persistence contracts.
// FLOW: DTO validation → domain logic → repository → database constraint.

export enum AdminHrStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PAID = 'PAID',
  PENDING = 'PENDING',
}



export enum AdminHrPerformancePeriod {
  THIS_MONTH = 'THIS_MONTH',
  LAST_MONTH = 'LAST_MONTH',
  THIS_QUARTER = 'THIS_QUARTER',
}
