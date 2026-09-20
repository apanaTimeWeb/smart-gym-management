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

export const WhiteLabelDomainsDataSchema = z.array(WhiteLabelDomainSchema);

export const UpdateDomainStatusSchema = z.object({
  status: z.enum(['pending', 'active', 'failed']),
});

export const UpdateDomainStatusDataSchema = WhiteLabelDomainSchema;
