// RESPONSIBILITY: Defines the typed response contract for this Superadmin module.
import { z } from 'zod';

export const SuperadminIntegrationTenantSchema = z.object({ id: z.string(), name: z.string() });

export const SuperadminIntegrationKeySchema = z.object({
    id: z.string(),
    tenant: z.string(),
    label: z.string(),
    status: z.string(),
    lastUsed: z.string().nullable(),
    rateLimit: z.string(),
});

export const SuperadminGenerateApiKeyResultSchema = z.object({
    key: SuperadminIntegrationKeySchema,
    secretKey: z.string().min(1),
});

export const SuperadminIntegrationsResponseSchema = z.object({
    tenants: z.array(SuperadminIntegrationTenantSchema),
    integrations: z.array(
        z.object({
            name: z.string(),
            type: z.string(),
            status: z.string(),
            lastEvent: z.string().nullable(),
            failedEvents: z.number(),
            health: z.number(),
        }),
    ),
    webhooks: z.array(
        z.object({
            id: z.string(),
            event: z.string(),
            integration: z.string(),
            status: z.string(),
            attempts: z.number(),
            latency: z.number(),
            time: z.string(),
        }),
    ),
    keys: z.array(SuperadminIntegrationKeySchema),
});

export type SuperadminIntegrationsResponse = z.infer<typeof SuperadminIntegrationsResponseSchema>;

export interface SuperadminIntegrationsSectionProps {
    data: SuperadminIntegrationsResponse;
}

export type SuperadminIntegrationTenant = z.infer<typeof SuperadminIntegrationTenantSchema>;
export type SuperadminIntegrationKey = z.infer<typeof SuperadminIntegrationKeySchema>;
export type SuperadminGenerateApiKeyResult = z.infer<typeof SuperadminGenerateApiKeyResultSchema>;
