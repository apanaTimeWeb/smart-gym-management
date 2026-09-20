import { displayValue, formatCurrencyFromMinorUnits } from '@/lib/formatters';
import type { SuperadminWhatsAppRecipient } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
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
        return formatCurrencyFromMinorUnits(value);
    return displayValue(value as string | number | null | undefined, '—');
}
export function replaceWhatsAppVariables(template: string, recipient: SuperadminWhatsAppRecipient): string {
    return Object.entries(VARIABLE_FIELDS).reduce((message, [variable, field]) => {
        return message.split(variable).join(formatVariableValue(field, recipient[field]));
    }, template);
}
export function buildWhatsAppLink(phone: string, message: string): string {
    const digits = phone.replace(/\D/g, '');
    return `${MessagingUrlConfig.WHATSAPP_CLICK_TO_CHAT_BASE}/${digits}?text=${encodeURIComponent(message)}`;
}
export function isWhatsAppRecipientReady(recipient: SuperadminWhatsAppRecipient): boolean {
    const digits = recipient.phone.replace(/\D/g, '');
    return recipient.whatsappOptIn && digits.length >= 8;
}
export function matchesWhatsAppAudience(recipient: SuperadminWhatsAppRecipient, audienceId: string): boolean {
    if (audienceId === 'ALL_TENANT_CONTACTS')
        return true;
    if (audienceId === 'ALL_TENANT_ADMINS') {
        return recipient.contactRole === 'TENANT_OWNER' || recipient.contactRole === 'TENANT_ADMIN' || recipient.contactRole === 'TENANT_MANAGER';
    }
    return recipient.audienceKey === audienceId;
}
export function getWhatsAppAudienceCount(recipients: SuperadminWhatsAppRecipient[], audienceId: string, tenantId: string): number {
    return recipients.filter((recipient) => {
        const audienceMatches = matchesWhatsAppAudience(recipient, audienceId);
        const tenantMatches = tenantId === 'ALL_TENANTS' || recipient.tenantId === tenantId;
        return audienceMatches && tenantMatches && isWhatsAppRecipientReady(recipient);
    }).length;
}
export function getWhatsAppPreviewRecipient(recipients: SuperadminWhatsAppRecipient[], audienceId: string, tenantId: string): SuperadminWhatsAppRecipient | null {
    return recipients.find((recipient) => {
        const audienceMatches = matchesWhatsAppAudience(recipient, audienceId);
        const tenantMatches = tenantId === 'ALL_TENANTS' || recipient.tenantId === tenantId;
        return audienceMatches && tenantMatches && isWhatsAppRecipientReady(recipient);
    }) ?? null;
}
export function getEligibleWhatsAppRecipients(recipients: SuperadminWhatsAppRecipient[], audienceId: string, tenantId: string): SuperadminWhatsAppRecipient[] {
    return recipients.filter((recipient) => {
        const audienceMatches = matchesWhatsAppAudience(recipient, audienceId);
        const tenantMatches = tenantId === 'ALL_TENANTS' || recipient.tenantId === tenantId;
        return audienceMatches && tenantMatches && isWhatsAppRecipientReady(recipient);
    });
}
export function getUniqueWhatsAppTenants(recipients: SuperadminWhatsAppRecipient[]): Array<{
    id: string;
    name: string;
}> {
    const seen = new Set<string>();
    return recipients.reduce<Array<{
        id: string;
        name: string;
    }>>((result, recipient) => {
        if (!seen.has(recipient.tenantId)) {
            seen.add(recipient.tenantId);
            result.push({ id: recipient.tenantId, name: recipient.tenantName });
        }
        return result;
    }, []);
}
