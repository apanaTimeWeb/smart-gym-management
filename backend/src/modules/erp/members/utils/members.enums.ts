export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
}

export enum PaymentStatus {
  PAID = 'PAID',
  DUE = 'DUE',
  REFUNDED = 'REFUNDED',
}

export enum BillingCycle {
  ONE_MONTH = 'ONE_MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  TWELVE_MONTHS = 'TWELVE_MONTHS',
  CUSTOM = 'CUSTOM',
}

export enum PlanTier {
  BASIC = 'BASIC',
  GOLD = 'GOLD',
  PREMIUM = 'PREMIUM',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum AttendanceType {
  MEMBER = 'MEMBER',
  STAFF = 'STAFF',
}

export enum InquiryStatus {
  NEW = 'NEW',
  FOLLOW_UP = 'FOLLOW_UP',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
}
