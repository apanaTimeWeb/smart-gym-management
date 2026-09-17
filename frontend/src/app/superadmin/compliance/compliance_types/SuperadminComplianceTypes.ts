// RESPONSIBILITY: Defines the typed response contract for this Superadmin module.
import { z } from 'zod';

export const SuperadminComplianceResponseSchema = z.object({
    summary: z.object({
        registeredTenants: z.number(),
        missingTaxDetails: z.number(),
        documentsExpiring: z.number(),
        openComplianceTasks: z.number(),
    }),
    regions: z.array(
        z.object({
            region: z.string(),
            registered: z.number(),
            missing: z.number(),
            taxRate: z.number(),
            status: z.string(),
        }),
    ),
    documents: z.array(
        z.object({
            tenant: z.string(),
            document: z.string(),
            status: z.string(),
            expires: z.string().nullable(),
        }),
    ),
});

export type SuperadminComplianceResponse = z.infer<typeof SuperadminComplianceResponseSchema>;

export interface SuperadminComplianceSectionProps {
    data: SuperadminComplianceResponse;
}
