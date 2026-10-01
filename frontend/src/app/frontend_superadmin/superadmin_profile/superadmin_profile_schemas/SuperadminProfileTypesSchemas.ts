import { z } from 'zod';

export const SuperadminProfileDataSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
    timezone: z.string().optional(),
    language: z.string().optional(),
    role: z.literal('SUPERADMIN'),
    avatarUrl: z.string().optional(),
    lastLoginAt: z.string(),
    createdAt: z.string(),
    twoFactorEnabled: z.boolean(),
});
