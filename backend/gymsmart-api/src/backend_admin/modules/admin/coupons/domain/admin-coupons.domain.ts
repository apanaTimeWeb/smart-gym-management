// RESPONSIBILITY: Defines the ORM-independent domain shape for Admin coupons records.
// FLOW: PostgreSQL entity â†’ AdminCouponsMapper â†’ AdminCouponsDomainModel â†’ service.

export interface AdminCouponsDomainModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name?: string | null;
  status?: string | null;
  data: Record<string, unknown>;
}
