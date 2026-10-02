/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines the runtime-validated Team response and alert-preference mutation contracts for Superadmin.
import { z } from 'zod';export type SuperadminTeamResponse = z.infer<typeof SuperadminTeamResponseSchema>;
import { SuperadminTeamResponseSchema, SuperadminTeamAlertPreferencesUpdateResponseSchema } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_schemas/SuperadminTeamContractSchemas';
export type SuperadminTeamAlertPreference = SuperadminTeamResponse['alerts'][number];
export interface SuperadminTeamAlertPreferenceUpdate { name:string; enabled:boolean; }export interface SuperadminTeamSectionProps { data: SuperadminTeamResponse; }
