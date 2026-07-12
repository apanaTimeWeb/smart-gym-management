export enum CouponStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
  DEPLETED = 'DEPLETED'
}
export interface ICoupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'EXACT';
  discountValue: number;
  maxUses: number;
  currentUses: number;
  status: CouponStatus;
  expiryDate: Date;
}
