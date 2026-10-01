import { z } from 'zod';

import { SupportTicketSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsTypesSchemas';

export const SuperadminTicketsListDataSchema = z.array(SupportTicketSchema);
