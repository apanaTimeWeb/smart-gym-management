import { z } from 'zod';

import { WhiteLabelDomainSchema, WhiteLabelDomainsDataSchema, UpdateDomainStatusSchema } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_schemas/SuperadminWhiteLabelingSchemas';

import type { ApiResponse } from '@/lib/api';



export type WhiteLabelDomain = z.infer<typeof WhiteLabelDomainSchema>;
export type WhiteLabelDomainsListResponse = ApiResponse<z.infer<typeof WhiteLabelDomainsDataSchema>>;
export type UpdateDomainStatusDto = z.infer<typeof UpdateDomainStatusSchema>;
export type UpdateDomainStatusResponse = ApiResponse<WhiteLabelDomain>;
export type SuperadminWhiteLabelingStatus = UpdateDomainStatusDto['status'];
