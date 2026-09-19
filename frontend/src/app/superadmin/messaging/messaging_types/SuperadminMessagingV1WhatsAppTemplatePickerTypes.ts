// RESPONSIBILITY: Type contract extracted from SuperadminMessagingV1WhatsAppTemplatePicker.tsx; no business behavior.
import type { SuperadminWhatsAppTemplate } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

export interface SuperadminMessagingV1WhatsAppTemplatePickerProps {
    templates: SuperadminWhatsAppTemplate[];
    selectedId: string;
    onSelect: (template: SuperadminWhatsAppTemplate) => void;
}
