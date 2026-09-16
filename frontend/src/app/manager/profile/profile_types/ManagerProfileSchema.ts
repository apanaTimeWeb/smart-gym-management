import { z } from 'zod';

export const managerProfileDataSchema = z.object({
  id: z.string(), name: z.string(), email: z.string(), phone: z.string(), role: z.string(), branchName: z.string(), joinedAt: z.string(), avatarInitial: z.string(),
});
export const managerProfileResponseSchema = z.record(z.string(), z.unknown());
export const managerPasswordUpdateResponseSchema = z.record(z.string(), z.unknown());
