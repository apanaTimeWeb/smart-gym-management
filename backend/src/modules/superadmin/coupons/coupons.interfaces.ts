export interface ICoupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxUses: number;
  currentUses: number;
  status: 'ACTIVE' | 'DEPLETED' | 'EXPIRED';
  expiryDate: string;
}

export interface ICouponListResponse {
  data: ICoupon[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
