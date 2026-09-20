// RESPONSIBILITY: Validates Landing contact form input at the form and API boundaries.
import { z } from 'zod';
import type { LandingContactApiPayload } from '@/app/landing/landing_types/landing_types';

export const LandingContactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  message: z.string().trim().min(1, 'Please enter your message.'),
});

export const LandingContactApiPayloadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
}) satisfies z.ZodType<LandingContactApiPayload>;
