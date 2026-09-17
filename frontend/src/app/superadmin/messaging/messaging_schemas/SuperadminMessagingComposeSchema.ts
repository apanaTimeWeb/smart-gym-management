// RESPONSIBILITY: Defines the Superadmin tenant-level message composer validation contract.
import { z } from 'zod';

export const SuperadminMessagingComposeSchema = z.object({
  tenantId: z.string().min(1, 'Select a tenant.'),
  channel: z.enum(['EMAIL', 'SMS', 'IN_APP']),
  subject: z.string().trim().min(1, 'Subject is required.').max(200, 'Subject must be 200 characters or fewer.'),
  body: z.string().trim().min(1, 'Message body is required.').max(5000, 'Message body must be 5000 characters or fewer.'),
});

export type SuperadminMessagingComposeValues = z.infer<typeof SuperadminMessagingComposeSchema>;
