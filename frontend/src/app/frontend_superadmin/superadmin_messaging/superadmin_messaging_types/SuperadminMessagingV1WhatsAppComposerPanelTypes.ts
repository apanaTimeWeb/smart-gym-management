// RESPONSIBILITY: Type contract extracted from SuperadminMessagingV1WhatsAppComposerPanel.tsx; no business behavior.
import type { SuperadminWhatsAppTemplate } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

export interface SuperadminMessagingV1WhatsAppComposerPanelProps {
    template: SuperadminWhatsAppTemplate | undefined;
    title: string;
    body: string;
    variables: string[];
    onTitleChange: (value: string) => void;
    onBodyChange: (value: string) => void;
    onInsertVariable: (value: string) => void;
}
