// RESPONSIBILITY: Defines finite Admin domain values used by DTO, domain and persistence contracts.
// FLOW: DTO validation → domain logic → repository → database constraint.

export enum AdminAuditLogsStatus {
  ACTIVE = 'ACTIVE',
}


export enum AdminAuditLogsSeverity {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

