import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { SuperadminTicketsV1DataSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsV1Schema';

export const SuperadminTicketsV1ResponseSchema = SuperadminLayoutApiResponseSchema(SuperadminTicketsV1DataSchema);
