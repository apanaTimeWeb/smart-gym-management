import { z } from 'zod';

export const SuperadminMessagingV1DataSchema = z.object({ templates: z.array(z.object({ name: z.string(), channel: z.string(), uses: z.number(), status: z.string() })), campaigns: z.array(z.object({ name: z.string(), sent: z.number(), delivered: z.number(), opened: z.number(), responded: z.number() })), channels: z.array(z.string()) });
