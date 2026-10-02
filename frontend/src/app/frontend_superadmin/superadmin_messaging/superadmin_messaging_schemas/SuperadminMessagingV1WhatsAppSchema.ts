/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingV1WhatsAppSchema owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminWhatsAppRecipientSchema = z.object({
    id: z.string(),
    tenantId: z.string(),
    tenantName: z.string(),
    contactName: z.string(),
    contactRole: z.enum(['TENANT_OWNER', 'TENANT_ADMIN', 'TENANT_MANAGER']),
    phone: z.string(),
    audienceKey: z.enum([
        'ALL_TENANT_CONTACTS',
        'SUBSCRIPTION_DUE',
        'SUBSCRIPTION_OVERDUE',
        'TRIAL_ENDING',
        'ONBOARDING_TENANTS',
        'AT_RISK_TENANTS',
        'MAINTENANCE_AFFECTED',
        'ALL_TENANT_ADMINS',
    ]),
    planName: z.string().nullable(),
    subscriptionAmount: z.number().nullable(),
    invoiceNumber: z.string().nullable(),
    dueDate: z.string().nullable(),
    trialEndDate: z.string().nullable(),
    maintenanceStart: z.string().nullable(),
    maintenanceEnd: z.string().nullable(),
    affectedService: z.string().nullable(),
    supportLink: z.string().nullable(),
    dashboardLink: z.string().nullable(),
    whatsappOptIn: z.boolean(),
});

export const SuperadminWhatsAppTemplateSchema = z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['BILLING', 'ONBOARDING', 'OPERATIONS', 'ANNOUNCEMENT', 'SECURITY', 'CUSTOM']),
    description: z.string(),
    title: z.string(),
    body: z.string(),
    variables: z.array(z.string()),
    status: z.enum(['READY', 'DRAFT']),
    recommendedAudienceId: z.string(),
});

export const SuperadminWhatsAppAudienceSchema = z.object({
    id: z.enum([
        'ALL_TENANT_CONTACTS',
        'SUBSCRIPTION_DUE',
        'SUBSCRIPTION_OVERDUE',
        'TRIAL_ENDING',
        'ONBOARDING_TENANTS',
        'AT_RISK_TENANTS',
        'MAINTENANCE_AFFECTED',
        'ALL_TENANT_ADMINS',
    ]),
    label: z.string(),
    description: z.string(),
    recipientType: z.literal('TENANT_CONTACT'),
});

export const SuperadminWhatsAppCampaignSchema = z.object({
    id: z.string(),
    name: z.string(),
    audienceLabel: z.string(),
    templateName: z.string(),
    totalRecipients: z.number(),
    sentCount: z.number(),
    skippedCount: z.number(),
    status: z.enum(['READY', 'RUNNING', 'COMPLETED', 'PAUSED']),
    createdAt: z.string(),
});

export const SuperadminWhatsAppBulkCenterDataSchema = z.object({
    templates: z.array(SuperadminWhatsAppTemplateSchema),
    audiences: z.array(SuperadminWhatsAppAudienceSchema),
    recipients: z.array(SuperadminWhatsAppRecipientSchema),
    campaigns: z.array(SuperadminWhatsAppCampaignSchema),
    variables: z.array(z.string()),
});

export const SuperadminWhatsAppCreateCampaignPayloadSchema = z.object({
    name: z.string().min(1),
    audienceId: z.string().min(1),
    templateId: z.string().min(1),
    recipientIds: z.array(z.string()).min(1),
});
