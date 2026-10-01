import type { infer as ZodInfer } from 'zod';
import { AffiliateStatusSchema, AffiliateRecordSchema, AffiliateSchema, AffiliatePayoutRecordSchema } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesTypesSchemas';
// RESPONSIBILITY: Defines affiliate domain, form, response, and payout-history contracts for the Superadmin module.
export type AffiliateStatus = ZodInfer<typeof AffiliateStatusSchema>;
/** Filter tabs for the Affiliates status dropdown. */
import { SUPERADMIN_AFFILIATE_STATUS_FILTER_VALUES } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_constants/SuperadminAffiliatesTabConstants';

export type AffiliateStatusFilter = typeof SUPERADMIN_AFFILIATE_STATUS_FILTER_VALUES[number];
export type Affiliate = ZodInfer<typeof AffiliateRecordSchema>;
export type AffiliateFormData = ZodInfer<typeof AffiliateSchema>;
export type AffiliatePayoutRecord = ZodInfer<typeof AffiliatePayoutRecordSchema>;
