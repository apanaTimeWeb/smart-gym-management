// RESPONSIBILITY: Centralized runtime enum/configuration for Manager store.
// FLOW: DTO/entity/query allowlists -> Store feature behavior.

export enum ManagerStoreSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ManagerStoreProductFieldType {
  TEXT = 'text',
  NUMBER = 'number',
}

export enum ReturnStatus {
  NONE = 'NONE',
  PARTIAL = 'PARTIAL',
  FULL = 'FULL',
}

export enum StoreRecordStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export const StoreAllowedSortFields = ['createdAt', 'updatedAt', 'id'] as const;

export enum StoreCategory {
  SUPPLEMENTS = 'Supplements',
  ACCESSORIES = 'Accessories',
  EQUIPMENT = 'Equipment',
  MERCHANDISE = 'Merchandise',
  OTHERS = 'Others',
}

export enum StorePaymentMethod {
  UPI = 'UPI',
  CASH = 'Cash',
}
