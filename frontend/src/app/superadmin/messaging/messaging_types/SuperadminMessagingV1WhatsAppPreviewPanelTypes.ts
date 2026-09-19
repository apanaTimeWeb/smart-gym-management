// RESPONSIBILITY: Type contract extracted from SuperadminMessagingV1WhatsAppPreviewPanel.tsx; no business behavior.
import type { SuperadminWhatsAppRecipient } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

export interface SuperadminMessagingV1WhatsAppPreviewPanelProps {
    recipient: SuperadminWhatsAppRecipient | null;
    title: string;
    body: string;
}
