// RESPONSIBILITY: Defines domain/data transfer shapes for the compliance feature without ORM leakage.
// FLOW: DTO -> ComplianceInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminComplianceListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminComplianceCreateInput {
  kind?: string;
  payload?: unknown;
}
export interface SuperadminComplianceUpdateInput extends SuperadminComplianceCreateInput {}

export interface SuperadminComplianceDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  kind: string;
  payload: unknown;
}

export interface SuperadminComplianceSummaryRow { registered_tenants: string | number; missing_tax_details: string | number; trial_tenants: string | number; }
export interface SuperadminComplianceRegionRow { region: string; registered: string | number; missing: string | number; tax_rate?: string | number; }
