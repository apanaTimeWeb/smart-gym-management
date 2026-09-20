// RESPONSIBILITY: Centralized constants, Zod schema, and shared data for the Plans module. Single source of truth for tiers, pricing, and form defaults.

export const TIERS = ['Bronze', 'Silver', 'Gold'] as const;

import { planFormSchema } from '@/app/admin/plans/plans_types/AdminPlansSchemas';

import { z } from 'zod';
export type PlanFormValues = z.infer<typeof planFormSchema>;

export const EMPTY_PLAN_FORM: PlanFormValues = { 
 name: '', 
 tier: 'Gold', 
 price1Month: '', 
 price3Month: '', 
 price6Month: '', 
 price12Month: '', 
 priceCustom: '', 
 features: '' 
};

export const PLANS_ITEMS_PER_PAGE = 10;
