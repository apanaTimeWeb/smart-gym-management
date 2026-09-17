import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('useSuperadminCouponsMutation contract', () => {
  it('contains the required responsibility/data-flow contract and requires a toast id', () => {
    const source = fs.readFileSync(new URL('useSuperadminCouponsMutation.ts', import.meta.url), 'utf8');
    expect(source).toMatch(/(RESPONSIBILITY:|DATA FLOW:)/);
    expect(source).toContain('toastId: string');
    expect(source).toContain('toast.success(response.message, { id: options.toastId })');
    expect(source).toContain('toast.error(errorObj.message, { id: options.toastId })');
  });
});


describe('coupon mutation toast ownership', () => {
  it('keeps toast ids scoped to the operation/entity', () => {
    const source = fs.readFileSync(new URL('useSuperadminCouponsMutations.ts', import.meta.url), 'utf8');
    expect(source).toContain("toastId: `coupon-update-${id}`");
    expect(source).toContain("toastId: `coupon-delete-${id}`");
    expect(source).toContain("toastId: `coupon-restore-${id}`");
    expect(source).toContain("toastId: `coupon-toggle-${id}`");
    expect(source).toContain("coupon-toggle-invalid-${id}");
  });
});
