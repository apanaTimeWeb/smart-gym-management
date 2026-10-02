/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardV1Schema owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const SuperadminDashboardV1DataSchema = z.object({ currency: z.string(), openingIncome: z.number(), newIncome: z.number(), growthIncome: z.number(), returningIncome: z.number(), reducedIncome: z.number(), lostIncome: z.number(), endingIncome: z.number(), existingIncomeRetained: z.number(), gymRetention: z.number(), revenueLostPercent: z.number(), customerChurn: z.number(), alerts: z.array(z.object({ id: z.string(), level: z.string(), title: z.string(), detail: z.string(), count: z.number() })), leaderboard: z.array(z.object({ name: z.string(), plan: z.string(), income: z.number(), growth: z.number(), health: z.number() })), waterfall: z.array(z.object({ label: z.string(), value: z.number() })) });
