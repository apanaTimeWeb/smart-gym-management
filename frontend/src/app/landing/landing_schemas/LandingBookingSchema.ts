// RESPONSIBILITY: Validates Landing booking form input and its API-bound request shape.
import { z } from 'zod';
import type { LandingBookingApiPayload } from '@/app/landing/landing_types/landing_types';

export const LandingBookingSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date.'),
  type: z.enum(['trial', 'membership', 'class']),
});

export const LandingBookingApiPayloadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().regex(/^\d{10}$/),
  date: z.string().datetime({ offset: true }),
  type: z.enum(['trial', 'membership', 'class']),
}) satisfies z.ZodType<LandingBookingApiPayload>;
