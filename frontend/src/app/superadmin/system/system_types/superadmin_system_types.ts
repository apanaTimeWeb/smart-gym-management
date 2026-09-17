import { z } from 'zod';
export const SuperadminSystemTenantSchema = z.object({ id: z.string(), name: z.string(), plan: z.string(), databaseVersion: z.string().optional() });
export type SuperadminSystemTenant = z.infer<typeof SuperadminSystemTenantSchema>;
export const SuperadminSystemAuditLogSchema = z.object({ id: z.string(), timestamp: z.string(), targetResource: z.string(), actorName: z.string(), actorRole: z.string(), action: z.string() });
export type SuperadminSystemAuditLog = z.infer<typeof SuperadminSystemAuditLogSchema>;
export type SuperadminSystemTab = 'migrations' | 'sla';
