import type { MessagingTenant } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';

export interface SuperadminMessagingTenantDropdownProps {
  value: string;
  onChange: (id: string) => void;
  tenants: MessagingTenant[];
}
