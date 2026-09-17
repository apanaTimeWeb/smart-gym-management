// RESPONSIBILITY: Defines the runtime-validated Team response and alert-preference mutation contracts for Superadmin.
import { z } from 'zod';
export const SuperadminTeamResponseSchema = z.object({ users: z.array(z.object({ id:z.string(), name:z.string(), email:z.string().email(), role:z.string(), status:z.string(), mfa:z.string().nullable(), lastLogin:z.string().nullable() })), roles: z.array(z.object({ name:z.string(), scope:z.string(), permissions:z.number() })), alerts: z.array(z.object({ name:z.string(), channel:z.string(), threshold:z.string(), enabled:z.boolean() })) });
export type SuperadminTeamResponse = z.infer<typeof SuperadminTeamResponseSchema>;
export type SuperadminTeamAlertPreference = SuperadminTeamResponse['alerts'][number];
export interface SuperadminTeamAlertPreferenceUpdate { name:string; enabled:boolean; }
export const SuperadminTeamAlertPreferencesUpdateResponseSchema = z.object({ data: z.null() });
export interface SuperadminTeamSectionProps { data: SuperadminTeamResponse; }
