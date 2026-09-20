import { z } from 'zod';

export const WhiteLabelDomainSchema = z.object({
  id: z.string().uuid(),
  gymId: z.string().uuid(),
  gymName: z.string(),
  domain: z.string(),
  status: z.enum(['pending', 'active', 'failed']),
  sslStatus: z.enum(['pending', 'issued', 'failed']),
  logoUrl: z.string().url().nullable().optional(),
  primaryColor: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
});

export const WhiteLabelDomainsListResponseSchema = z.object({
  data: z.array(WhiteLabelDomainSchema),
  message: z.string().optional(),
});

export const UpdateDomainStatusSchema = z.object({
  status: z.enum(['pending', 'active', 'failed']),
});

export const UpdateDomainStatusResponseSchema = z.object({
  data: WhiteLabelDomainSchema,
  message: z.string(),
});
