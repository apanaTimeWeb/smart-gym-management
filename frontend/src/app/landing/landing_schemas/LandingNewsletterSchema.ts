// RESPONSIBILITY: Validates the single newsletter email field before the mail-client handoff.
import { z } from 'zod';

export const LandingNewsletterSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
});
