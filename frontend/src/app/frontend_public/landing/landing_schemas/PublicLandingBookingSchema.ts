// RESPONSIBILITY: Validates PublicLanding booking form input and its API-bound request shape.
import { z } from 'zod';
import { LANDING_BOOKING_TYPE_VALUES } from '@/app/frontend_public/landing/landing_constants/PublicLandingBookingConstants';
import type { PublicLandingBookingApiPayload } from '@/app/frontend_public/landing/landing_types/PublicLandingTypes';

export const PublicLandingBookingSchema = z.object({
  name: z.string().trim().min(1, 'validation.name'),
  email: z.string().trim().email('validation.email'),
  phone: z.string().regex(/^\d{10}$/, 'validation.phone'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'validation.date'),
  type: z.enum(LANDING_BOOKING_TYPE_VALUES),
});

export const PublicLandingBookingApiPayloadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().regex(/^\d{10}$/),
  date: z.string().datetime({ offset: true }),
  type: z.enum(LANDING_BOOKING_TYPE_VALUES),
}) satisfies z.ZodType<PublicLandingBookingApiPayload>;
