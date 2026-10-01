// RESPONSIBILITY: Type contract extracted from SuperadminMessagingV1WhatsAppQueuePanel.tsx; no business behavior.
import type { SuperadminWhatsAppQueueRecipient } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

export interface SuperadminMessagingV1WhatsAppQueuePanelProps {
    queue: SuperadminWhatsAppQueueRecipient[];
    activeIndex: number;
    onOpen: (index: number) => void;
    onMarkSent: (index: number) => void;
    onSkip: (index: number) => void;
    onClear: () => void;
}
