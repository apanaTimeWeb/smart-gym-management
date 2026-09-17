import { z } from 'zod';
// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Tickets module.
export const TicketStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'WAITING']);
export type TicketStatus = z.infer<typeof TicketStatusSchema>;
export const TicketPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'NORMAL', 'URGENT']);
export type TicketPriority = z.infer<typeof TicketPrioritySchema>;
export const SupportTicketMessageSchema = z.object({
    id: z.string(),
    senderId: z.string(),
    senderName: z.string(),
    senderRole: z.enum(['TENANT', 'SUPERADMIN', 'SYSTEM']),
    content: z.string(),
    attachments: z.array(z.string()).optional(),
    createdAt: z.string(),
});
export type SupportTicketMessage = z.infer<typeof SupportTicketMessageSchema>;
export const SupportTicketSchema = z.object({
    id: z.string(),
    tenantId: z.string(),
    tenantName: z.string().optional(),
    reporterEmail: z.string().optional(),
    subject: z.string(),
    description: z.string(),
    status: TicketStatusSchema,
    priority: TicketPrioritySchema,
    assignedTo: z.string().optional(),
    attachments: z.array(z.string()).optional(),
    slaDeadline: z.string().optional(),
    firstResponseAt: z.string().optional(),
    resolutionTime: z.number().optional(),
    messages: z.array(SupportTicketMessageSchema).optional(),
    createdAt: z.string(),
    lastUpdated: z.string().optional(),
    updatedAt: z.string().optional(),
});
export type SupportTicket = z.infer<typeof SupportTicketSchema>;
export const replySchema = z.object({
    replyText: z.string().min(1, 'Please enter a reply message.'),
});
export type ReplyFormValues = z.infer<typeof replySchema>;
