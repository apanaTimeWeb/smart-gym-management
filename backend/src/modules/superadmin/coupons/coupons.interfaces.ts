export type CouponStatus = 'ACTIVE' | 'EXPIRED' | 'DEPLETED';
export interface ICoupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxUses: number;
  currentUses: number;
  status: CouponStatus;
  expiryDate: Date;
}
