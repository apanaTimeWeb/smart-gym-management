import { SuperadminTicketsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsV1ResponseSchema';
import type { infer as ZodInfer } from 'zod';
import { SuperadminTicketsV1DataSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsV1Schema';
// RESPONSIBILITY: Defines the runtime-validated data contract for Support Performance & Service Levels.

export type SuperadminTicketsV1Data = ZodInfer<typeof SuperadminTicketsV1DataSchema>;
export type SuperadminTicketsV1Response = ZodInfer<typeof SuperadminTicketsV1ResponseSchema>;
export interface SuperadminTicketsV1SectionProps {
    data: SuperadminTicketsV1Data;
}
