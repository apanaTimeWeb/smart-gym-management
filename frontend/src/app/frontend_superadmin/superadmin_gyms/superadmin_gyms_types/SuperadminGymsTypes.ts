/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Gyms module.
import { z } from 'zod';export type TenantStatus = z.infer<typeof TenantStatusSchema>;export type SubscriptionHistoryItem = z.infer<typeof SubscriptionHistoryItemSchema>;export type UsageStats = z.infer<typeof UsageStatsSchema>;export type Tenant = z.infer<typeof TenantSchema>;export type GymStats = z.infer<typeof GymStatsSchema>;
import { TenantStatusSchema, SubscriptionHistoryItemSchema, UsageStatsSchema, TenantSchema, GymStatsSchema } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsContractSchemas';
