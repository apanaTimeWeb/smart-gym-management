// RESPONSIBILITY: Defines prop contracts for White-labeling presentation components.
import type { WhiteLabelDomain } from '@/app/superadmin/white-labeling/white-labeling_types/SuperadminWhiteLabelingTypes';

export interface SuperadminWhiteLabelingTableProps {
  domains: WhiteLabelDomain[];
}

export interface SuperadminWhiteLabelingStatusBadgeProps {
  status: WhiteLabelDomain['status'] | WhiteLabelDomain['sslStatus'];
}

export interface SuperadminWhiteLabelingDrawerProps {
  domains: WhiteLabelDomain[];
}
