// RESPONSIBILITY: Prop contract for the Superadmin tenant message compose modal.
import type { MessagingTenant } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';
import type { SuperadminMessagingComposeValues } from '@/app/superadmin/messaging/messaging_schemas/SuperadminMessagingComposeSchema';

export interface SuperadminMessagingComposeModalProps {
  tenants: MessagingTenant[];
  isSubmitting: boolean;
  onClose: () => void;
  onSend: (values: SuperadminMessagingComposeValues) => Promise<void>;
}
