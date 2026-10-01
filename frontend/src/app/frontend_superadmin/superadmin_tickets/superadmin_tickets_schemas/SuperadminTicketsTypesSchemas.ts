import { z } from 'zod';

export const TicketStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'WAITING']);

export const TicketPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'NORMAL', 'URGENT']);

export const SupportTicketMessageSchema = z.object({
    id: z.string(),
    senderId: z.string(),
    senderName: z.string(),
    senderRole: z.enum(['TENANT', 'SUPERADMIN', 'SYSTEM']),
    content: z.string(),
    attachments: z.array(z.string()).optional(),
    createdAt: z.string(),
});

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

export const replySchema = z.object({
    replyText: z.string().trim().min(1, 'Please enter a reply message.'),
});

export const TicketAssigneeInputSchema = z.object({
    assignee: z.string().trim().min(1, 'Please enter an assignee.'),
});
