// RESPONSIBILITY: Defines runtime validation for Superadmin segment form payloads.
import { z } from 'zod';
export const SuperadminSegmentCreatePayloadSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string(),
  rules: z.number().int().min(1),
  usedIn: z.string().trim().min(1),
});
export type SuperadminSegmentCreatePayload = z.infer<typeof SuperadminSegmentCreatePayloadSchema>;
