// RESPONSIBILITY: Centralized runtime enum/configuration for Manager inquiries.
// FLOW: DTO/entity/query allowlists -> Inquiries feature behavior.

export enum ManagerInquiriesMessageType {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
}

export enum InquiriesRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const InquiriesAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum InquiryStatus {
  NEW = 'NEW',
  FOLLOW_UP = 'FOLLOW_UP',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
}

export enum InquiryGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum InquiryBillingCycle {
  ONE_MONTH = 'ONE_MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  TWELVE_MONTHS = 'TWELVE_MONTHS',
  CUSTOM = 'CUSTOM',
}
