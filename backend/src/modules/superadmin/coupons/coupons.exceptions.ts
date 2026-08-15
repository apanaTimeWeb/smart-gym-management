export class CouponNotFoundException extends Error {
  constructor(message = 'Coupon not found') {
    super(message);
    this.name = 'CouponNotFoundException';
  }
}
