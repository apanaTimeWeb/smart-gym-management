// RESPONSIBILITY: Types for the Admin Usage plan-upgrade request workflow.

export type AdminUsageUpgradeStatus = 'pending';

export interface AdminUsageUpgradeRequest {
  requestId: string;
  planName: string;
  status: AdminUsageUpgradeStatus;
  requestedAt: string;
}
