import { z } from 'zod';
export const alertSeveritySchema = z.enum(['critical', 'warning', 'info']);
export const gymHealthAlertSchema = z.object({
  id: z.string(), gymId: z.string(), gymName: z.string(), alertType: z.string(), severity: alertSeveritySchema,
  title: z.string(), description: z.string(), metric: z.string(), threshold: z.string(), detectedAt: z.string(), actionKey: z.string(),
});
export const gymHealthKpiDataSchema = z.object({ totalAlerts: z.number(), criticalAlerts: z.number(), warningAlerts: z.number(), infoAlerts: z.number() });
