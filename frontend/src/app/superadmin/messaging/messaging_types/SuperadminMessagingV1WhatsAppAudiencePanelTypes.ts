// RESPONSIBILITY: Type contract extracted from SuperadminMessagingV1WhatsAppAudiencePanel.tsx; no business behavior.
import type { SuperadminWhatsAppAudience, SuperadminWhatsAppRecipient } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

export interface SuperadminMessagingV1WhatsAppAudiencePanelProps {
    audiences: SuperadminWhatsAppAudience[];
    recipients: SuperadminWhatsAppRecipient[];
    audienceId: string;
    tenantId: string;
    onAudienceChange: (id: string) => void;
    onTenantChange: (id: string) => void;
}
