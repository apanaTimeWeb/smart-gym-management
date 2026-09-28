// RESPONSIBILITY: Centralized runtime enum/configuration for Manager members.
// FLOW: DTO/entity/query allowlists -> Members feature behavior.

export enum MemberSortColumn {
  NAME = 'name',
  JOINDATE = 'joinDate',
  EXPIRYDATE = 'expiryDate',
  PAIDAMOUNT = 'paidAmount',
  STATUS = 'status',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ManagerMembersPaymentMethod {
  UPI = 'UPI',
  CASH = 'Cash',
  CARD = 'Card',
  NETBANKING = 'NetBanking',
}

export enum ManagerMembersKpiKey {
  TOTAL = 'total',
  ACTIVE = 'active',
  PENDING = 'pending',
  EXPIRED = 'expired',
}

export enum ExportFormat {
  CSV = 'csv',
  PDF = 'pdf',
}

export enum MemberProfileTab {
  OVERVIEW = 'overview',
  ATTENDANCE = 'attendance',
  PAYMENTS = 'payments',
  WORKOUT = 'workout',
  DIET = 'diet',
}

export enum ManagerMembersPaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum ManagerMembersDietPlanType {
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  MAINTENANCE = 'MAINTENANCE',
  KETO = 'KETO',
  VEGAN = 'VEGAN',
  OTHER = 'OTHER',
}

export enum ManagerMembersWorkoutLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum ManagerMembersAttendancePersonType {
  MEMBER = 'MEMBER',
  STAFF = 'STAFF',
}

export enum ManagerMembersMessageType {
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
}

export enum MembersRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const MembersAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  FROZEN = 'FROZEN',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
}

export enum MemberGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum MemberBillingCycle {
  ONE_MONTH = 'ONE_MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  TWELVE_MONTHS = 'TWELVE_MONTHS',
  CUSTOM = 'CUSTOM',
}
