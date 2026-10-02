import type { SuperadminWhatsAppRecipient } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingV1WhatsAppUtils owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatters, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatCurrency, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';
import { SuperadminMessagingFormatCurrency } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatCurrency';
import { superadminMessagingDisplayValue, superadminMessagingMaskPhone } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatters';



const VARIABLE_FIELDS: Record<string, keyof SuperadminWhatsAppRecipient> = {
    '{contact_name}': 'contactName',
    '{tenant_name}': 'tenantName',
    '{contact_role}': 'contactRole',
    '{plan_name}': 'planName',
    '{subscription_amount}': 'subscriptionAmount',
    '{invoice_number}': 'invoiceNumber',
    '{due_date}': 'dueDate',
    '{trial_end_date}': 'trialEndDate',
    '{maintenance_start}': 'maintenanceStart',
    '{maintenance_end}': 'maintenanceEnd',
    '{affected_service}': 'affectedService',
    '{support_link}': 'supportLink',
    '{dashboard_link}': 'dashboardLink',
};
function formatVariableValue(field: keyof SuperadminWhatsAppRecipient, value: unknown): string {
    if (value === 'TENANT_OWNER')
        return 'Owner';
    if (value === 'TENANT_ADMIN')
        return 'Admin';
    if (value === 'TENANT_MANAGER')
        return 'Manager';
    if (field === 'subscriptionAmount' && typeof value === 'number')
        return SuperadminMessagingFormatCurrency(value, 'INR', 'en-IN');
    return superadminMessagingDisplayValue(value as string | number | null | undefined, '—');
}
/**
 * @description Provides messaging formatting or feature utility behavior for replaceWhatsAppVariables.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function replaceWhatsAppVariables(template: string, recipient: SuperadminWhatsAppRecipient): string {
    return Object.entries(VARIABLE_FIELDS).reduce((message, [variable, field]) => {
        return message.split(variable).join(formatVariableValue(field, recipient[field]));
    }, template);
}
/**
 * @description Provides messaging formatting or feature utility behavior for buildWhatsAppLink.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function buildWhatsAppLink(phone: string, message: string): string {
    const digits = phone.replace(/\D/g, '');
    return `${MODULE_URLS.WHATSAPP_CLICK_TO_CHAT_BASE}/${digits}?text=${encodeURIComponent(message)}`;
}
