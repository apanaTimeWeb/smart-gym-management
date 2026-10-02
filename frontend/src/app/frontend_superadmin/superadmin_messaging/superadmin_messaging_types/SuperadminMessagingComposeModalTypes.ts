// RESPONSIBILITY: Prop contract for the Superadmin tenant message compose modal.
import type { SuperadminMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingComposeTypes';
import type { MessagingTenant } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';



export interface SuperadminMessagingComposeModalProps {
  tenants: MessagingTenant[];
  isSubmitting: boolean;
  onClose: () => void;
  onSend: (values: SuperadminMessagingComposeValues) => Promise<void>;
}
