import { z } from 'zod';

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.string(),
  price1Month: z.number(),
  price3Month: z.number(),
  price6Month: z.number(),
  price12Month: z.number(),
  features: z.array(z.string()),
  isActive: z.boolean() });

export const plansResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(planSchema).nullable(),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number() }).optional() });

export const planResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: planSchema.nullable() });
