import { TicketStatusSchema, TicketPrioritySchema, SupportTicketMessageSchema, SupportTicketSchema, replySchema, TicketAssigneeInputSchema } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_schemas/SuperadminTicketsTypesSchemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Tickets module.
export type TicketStatus = ZodInfer<typeof TicketStatusSchema>;
export type TicketPriority = ZodInfer<typeof TicketPrioritySchema>;
export type SupportTicketMessage = ZodInfer<typeof SupportTicketMessageSchema>;
export type SupportTicket = ZodInfer<typeof SupportTicketSchema>;
export type SuperadminTicketsReplyFormValues = ZodInfer<typeof replySchema>;
export type TicketAssigneeInput = ZodInfer<typeof TicketAssigneeInputSchema>;
