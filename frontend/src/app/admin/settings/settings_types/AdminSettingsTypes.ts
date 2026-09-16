// RESPONSIBILITY: Defines all TypeScript types for the Settings module. Derived from Zod schemas — no inline interfaces.
import { type z } from 'zod';
import type { GymProfileSchema, NotificationsSettingsSchema, AppIntegrationSettingsSchema, GstTaxSettingsSchema, PaymentGatewaySettingsSchema, GeneralSettingsSchema, AdminSettingsResponseSchema } from '@/app/admin/settings/settings_types/AdminSettings.schema';

export type GymProfileType = z.infer<typeof GymProfileSchema>;
export type NotificationsSettingsType = z.infer<typeof NotificationsSettingsSchema>;
export type AppIntegrationSettingsType = z.infer<typeof AppIntegrationSettingsSchema>;
export type GstTaxSettingsType = z.infer<typeof GstTaxSettingsSchema>;
export type PaymentGatewaySettingsType = z.infer<typeof PaymentGatewaySettingsSchema>;
export type GeneralSettingsType = z.infer<typeof GeneralSettingsSchema>;
export type AdminSettingsResponse = z.infer<typeof AdminSettingsResponseSchema>;
