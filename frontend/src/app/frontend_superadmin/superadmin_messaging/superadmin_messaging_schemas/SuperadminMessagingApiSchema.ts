/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminMessagingApiSchema owned by the superadmin_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema, @/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingTypesSchemas
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { MessagingTenantSchema, SuperadminNotificationSchema, TenantMessageSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingTypesSchemas';



export const SuperadminMessagingMessagesResponseSchema = SuperadminLayoutApiResponseSchema(z.array(TenantMessageSchema));
export const SuperadminMessagingNotificationsResponseSchema = SuperadminLayoutApiResponseSchema(z.array(SuperadminNotificationSchema));
export const SuperadminMessagingTenantsResponseSchema = SuperadminLayoutApiResponseSchema(z.array(MessagingTenantSchema));
export const SuperadminMessagingNotificationResponseSchema = SuperadminLayoutApiResponseSchema(SuperadminNotificationSchema);
export const SuperadminMessagingMessageResponseSchema = SuperadminLayoutApiResponseSchema(TenantMessageSchema);
