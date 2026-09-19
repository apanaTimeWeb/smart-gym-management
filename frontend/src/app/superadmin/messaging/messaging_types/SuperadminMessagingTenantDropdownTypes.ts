import type { MessagingTenant } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';

export interface SuperadminMessagingTenantDropdownProps {
  value: string;
  onChange: (id: string) => void;
  tenants: MessagingTenant[];
}
