// RESPONSIBILITY: Defines props for the affiliate payout history view.
import type { AffiliatePayoutRecord } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';
export interface SuperadminAffiliatesPayoutHistoryProps {
  payouts: AffiliatePayoutRecord[];
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}
