// RESPONSIBILITY: Validates and exposes role-level public runtime configuration without allowing UI modules to read process.env directly.

import { z } from 'zod';

const SuperadminEnvironmentSchema = z.object({
  NEXT_PUBLIC_SUPERADMIN_WS_URL: z.string().url().optional(),
});

const parsedSuperadminEnvironment = SuperadminEnvironmentSchema.parse({
  NEXT_PUBLIC_SUPERADMIN_WS_URL: process.env.NEXT_PUBLIC_SUPERADMIN_WS_URL,
});

export const SuperadminLayoutEnvironmentConfig = {
  websocketUrl: parsedSuperadminEnvironment.NEXT_PUBLIC_SUPERADMIN_WS_URL,
};
