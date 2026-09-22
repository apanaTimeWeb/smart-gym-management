// RESPONSIBILITY: Centralized runtime enum/configuration for Manager hr.
// FLOW: DTO/entity/query allowlists -> Hr feature behavior.

export enum SalaryType {
  MONTHLY = 'Monthly',
  DAILY = 'Daily',
}

export enum ManagerHrGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum HrRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const HrAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum PaymentCycle {
  MONTHLY = 'Monthly',
  BI_WEEKLY = 'Bi-Weekly',
  WEEKLY = 'Weekly',
}

export enum StaffDocument {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  BANK = 'BANK',
}

export enum StaffEmergencyContact {
  PRIMARY = 'PRIMARY',
}

export enum HrPayrollStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export enum HrGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum HrPaymentMode {
  UPI = 'UPI',
  CASH = 'Cash',
  CARD = 'Card',
  BANK_TRANSFER = 'Bank Transfer',
  CHEQUE = 'Cheque',
  OTHER = 'Other',
}

export enum HrLedgerEntryType {
  SALARY_GENERATED = 'Salary Generated',
  SALARY_PAID = 'Salary Paid',
  ADVANCE_GIVEN = 'Advance Given',
  DUE_PAID = 'Due Paid',
}

export enum HrStaffRole {
  TRAINER = 'Trainer',
  STAFF = 'Staff',
  MANAGER = 'Manager',
  ACCOUNTANT = 'Accountant',
}
