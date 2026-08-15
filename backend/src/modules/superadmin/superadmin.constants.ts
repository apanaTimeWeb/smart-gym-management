// ─── Canonical Enums (Single Source of Truth — Rule 5) ─────────────────────
// These enums are imported by gyms.entity.ts, plans.entity.ts, and invoices.entity.ts.
// DO NOT redefine them in individual entity files.

// Removed SaaSPlanTier enum

export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TRIAL = 'TRIAL',
  CANCELLED = 'CANCELLED',
}
