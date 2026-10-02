/**
 * RESPONSIBILITY: Owns WhatsApp audience eligibility and tenant/audience derivation helpers for the Superadmin Messaging feature.
 * DATA FLOW: WhatsApp recipient fixtures/API data → audience utility functions → WhatsApp audience UI.
 * EDGE CASES: Treats missing opt-in or invalid phone numbers as ineligible and preserves tenant scoping.
 */
import type { SuperadminWhatsAppRecipient } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

/**
 * @description Provides messaging formatting or feature utility behavior for isWhatsAppRecipientReady.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function isWhatsAppRecipientReady(recipient: SuperadminWhatsAppRecipient): boolean {
    const digits = recipient.phone.replace(/\D/g, '');
    return recipient.whatsappOptIn && digits.length >= 8;
}
/**
 * @description Provides messaging formatting or feature utility behavior for matchesWhatsAppAudience.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function matchesWhatsAppAudience(recipient: SuperadminWhatsAppRecipient, audienceId: string): boolean {
    if (audienceId === 'ALL_TENANT_CONTACTS')
        return true;
    if (audienceId === 'ALL_TENANT_ADMINS') {
        return recipient.contactRole === 'TENANT_OWNER' || recipient.contactRole === 'TENANT_ADMIN' || recipient.contactRole === 'TENANT_MANAGER';
    }
    return recipient.audienceKey === audienceId;
}
/**
 * @description Provides messaging formatting or feature utility behavior for getWhatsAppAudienceCount.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getWhatsAppAudienceCount(recipients: SuperadminWhatsAppRecipient[], audienceId: string, tenantId: string): number {
    return recipients.filter((recipient) => {
        const audienceMatches = matchesWhatsAppAudience(recipient, audienceId);
        const tenantMatches = tenantId === 'ALL_TENANTS' || recipient.tenantId === tenantId;
        return audienceMatches && tenantMatches && isWhatsAppRecipientReady(recipient);
    }).length;
}
/**
 * @description Provides messaging formatting or feature utility behavior for getWhatsAppPreviewRecipient.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getWhatsAppPreviewRecipient(recipients: SuperadminWhatsAppRecipient[], audienceId: string, tenantId: string): SuperadminWhatsAppRecipient | null {
    return recipients.find((recipient) => {
        const audienceMatches = matchesWhatsAppAudience(recipient, audienceId);
        const tenantMatches = tenantId === 'ALL_TENANTS' || recipient.tenantId === tenantId;
        return audienceMatches && tenantMatches && isWhatsAppRecipientReady(recipient);
    }) ?? null;
}
/**
 * @description Provides messaging formatting or feature utility behavior for getEligibleWhatsAppRecipients.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getEligibleWhatsAppRecipients(recipients: SuperadminWhatsAppRecipient[], audienceId: string, tenantId: string): SuperadminWhatsAppRecipient[] {
    return recipients.filter((recipient) => {
        const audienceMatches = matchesWhatsAppAudience(recipient, audienceId);
        const tenantMatches = tenantId === 'ALL_TENANTS' || recipient.tenantId === tenantId;
        return audienceMatches && tenantMatches && isWhatsAppRecipientReady(recipient);
    });
}
/**
 * @description Provides messaging formatting or feature utility behavior for getUniqueWhatsAppTenants.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
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
