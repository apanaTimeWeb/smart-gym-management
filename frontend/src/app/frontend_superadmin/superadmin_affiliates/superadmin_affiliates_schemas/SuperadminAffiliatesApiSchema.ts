import { z } from 'zod';

import { AffiliatePayoutRecordSchema, AffiliateRecordSchema } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_schemas/SuperadminAffiliatesTypesSchemas';

export const SuperadminAffiliatesListDataSchema = z.array(AffiliateRecordSchema);
export const SuperadminAffiliatesDeleteDataSchema = z.null();
export const SuperadminAffiliatesPayoutHistoryDataSchema = z.array(AffiliatePayoutRecordSchema);
