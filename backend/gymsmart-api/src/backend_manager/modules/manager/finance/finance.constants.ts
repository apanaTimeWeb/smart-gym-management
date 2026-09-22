// RESPONSIBILITY: Centralized runtime enum/configuration for Manager finance.
// FLOW: DTO/entity/query allowlists -> Finance feature behavior.

export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  REFUNDED = 'REFUNDED',
  PARTIAL = 'PARTIAL',
}

export enum ManagerFinanceExportFormat {
  CSV = 'csv',
  PDF = 'pdf',
}

export enum PaymentMethod {
  UPI = 'UPI',
  CASH = 'Cash',
  CARD = 'Card',
  NETBANKING = 'NetBanking',
  CHEQUE = 'Cheque',
  OTHER = 'Other',
}

export enum FinanceRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const FinanceAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;
