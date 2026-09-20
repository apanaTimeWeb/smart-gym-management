import type { Coupon } from '@/app/superadmin/saas-billing/coupons/coupons_types/SuperadminCouponsTypes';

export const MOCK_SUPERADMIN_COUPONS: Coupon[] = [
    { id: 'c1', code: 'WELCOME50', discountType: 'PERCENTAGE', discountValue: 50, maxUses: 100, currentUses: 2, status: 'ACTIVE', expiryDate: '2026-10-31', isDeleted: false, redemptions: [{ id: 'r1', tenantName: 'Iron Paradise', redeemedAt: '2026-09-16T10:00:00.000Z', planName: 'PRO', discountApplied: 750000 }, { id: 'r2', tenantName: 'Fit Life Studio', redeemedAt: '2026-09-15T12:30:00.000Z', planName: 'BASIC', discountApplied: 500000 }] },
    { id: 'c2', code: 'PRO500', discountType: 'EXACT', discountValue: 500, maxUses: 50, currentUses: 1, status: 'ACTIVE', expiryDate: '2026-09-30', isDeleted: false, redemptions: [{ id: 'r3', tenantName: 'CrossFit Box', redeemedAt: '2026-09-14T09:00:00.000Z', planName: 'PRO', discountApplied: 50000 }] },
    { id: 'c3', code: 'SUMMER20', discountType: 'PERCENTAGE', discountValue: 20, maxUses: 200, currentUses: 10, status: 'EXPIRED', expiryDate: '2026-08-15', isDeleted: false },
    { id: 'c4', code: 'FULLYEAR10', discountType: 'PERCENTAGE', discountValue: 10, maxUses: 75, currentUses: 0, status: 'INACTIVE', expiryDate: '2026-12-31', isDeleted: false },
    { id: 'c5', code: 'ENTERPRISE25', discountType: 'PERCENTAGE', discountValue: 25, maxUses: 25, currentUses: 25, status: 'DEPLETED', expiryDate: '2026-10-15', isDeleted: false },
    { id: 'c6', code: 'FOUNDER1000', discountType: 'EXACT', discountValue: 1000, maxUses: 10, currentUses: 4, status: 'ACTIVE', expiryDate: '2026-11-15', isDeleted: false },
    { id: 'c7', code: 'AUGUST15', discountType: 'PERCENTAGE', discountValue: 15, maxUses: 100, currentUses: 95, status: 'DEPLETED', expiryDate: '2026-09-20', isDeleted: false },
    { id: 'c8', code: 'OLDYEAR5', discountType: 'PERCENTAGE', discountValue: 5, maxUses: 100, currentUses: 2, status: 'EXPIRED', expiryDate: '2026-08-01', isDeleted: false },
    { id: 'c9', code: 'PAUSE20', discountType: 'PERCENTAGE', discountValue: 20, maxUses: 40, currentUses: 0, status: 'INACTIVE', expiryDate: '2026-12-15', isDeleted: false },
    { id: 'c10', code: 'FITSTART30', discountType: 'PERCENTAGE', discountValue: 30, maxUses: 60, currentUses: 18, status: 'ACTIVE', expiryDate: '2026-10-10', isDeleted: false },
];
