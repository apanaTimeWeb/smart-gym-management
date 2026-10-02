/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminPlansV1DataSchema = z.object({ plans: z.array(z.object({ name: z.string(), monthly: z.number(), currency: z.string().optional(), members: z.number(), storage: z.number(), branches: z.number() })), versions: z.array(z.object({ plan: z.string(), version: z.string(), effective: z.string(), monthly: z.number(), currency: z.string().optional(), change: z.string() })), addons: z.array(z.object({ name: z.string(), price: z.number(), currency: z.string().optional() })), migration: z.object({ from: z.string(), to: z.string(), tenants: z.number(), monthlyChange: z.number(), currency: z.string().optional(), limitConflicts: z.number() }) });
export const SuperadminPlansV1ResponseSchema = z.object({ data: SuperadminPlansV1DataSchema, message: z.string(), success: z.boolean() });
