// RESPONSIBILITY: Type contract extracted from SuperadminMessagingV1WhatsAppTemplatePicker.tsx; no business behavior.
import type { SuperadminWhatsAppTemplate } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

export interface SuperadminMessagingV1WhatsAppTemplatePickerProps {
    templates: SuperadminWhatsAppTemplate[];
    selectedId: string;
    onSelect: (template: SuperadminWhatsAppTemplate) => void;
}
