// RESPONSIBILITY: Validates PublicLanding contact form input and its API-bound request shape.
import { z } from 'zod';
import type { PublicLandingContactApiPayload } from '@/app/frontend_public/landing/landing_types/PublicLandingTypes';

export const PublicLandingContactSchema = z.object({
  name: z.string().trim().min(1, 'validation.name'),
  email: z.string().trim().email('validation.email'),
  message: z.string().trim().min(1, 'validation.message'),
});

export const PublicLandingContactApiPayloadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
}) satisfies z.ZodType<PublicLandingContactApiPayload>;
