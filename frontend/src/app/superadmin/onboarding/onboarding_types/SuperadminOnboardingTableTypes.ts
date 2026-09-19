import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingTypes';
export interface SuperadminOnboardingTableProps {
  filtered: TenantOnboarding[];
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
  handleMarkVerified: (id: string) => void;
  handleResendVerification: (id: string) => void;
  setExtendModalId: (id: string | null) => void;
  setConvertConfirmId: (id: string | null) => void;
}
