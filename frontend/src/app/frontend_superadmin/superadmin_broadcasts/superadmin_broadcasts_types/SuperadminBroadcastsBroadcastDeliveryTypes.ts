/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBroadcastsBroadcastDeliveryTypes owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines the runtime-validated delivery result contract for the Superadmin Broadcasts recipient queue.
import { z } from 'zod';

import { SuperadminBroadcastDeliveryStatusSchema, SuperadminBroadcastDeliveryResultSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsBroadcastDeliveryContractSchemas';
import { BroadcastResponseSchema } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_schemas/SuperadminBroadcastsContractSchemas';



export type SuperadminBroadcastDeliveryStatus = z.infer<typeof SuperadminBroadcastDeliveryStatusSchema>;
export type SuperadminBroadcastDeliveryResult = z.infer<typeof SuperadminBroadcastDeliveryResultSchema>;
