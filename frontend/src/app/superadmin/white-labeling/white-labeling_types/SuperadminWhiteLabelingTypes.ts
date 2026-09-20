import { z } from 'zod';
import type { ApiResponse } from '@/lib/api';
import { WhiteLabelDomainSchema, WhiteLabelDomainsDataSchema, UpdateDomainStatusSchema } from '@/app/superadmin/white-labeling/white-labeling_schemas/SuperadminWhiteLabelingSchemas';

export type WhiteLabelDomain = z.infer<typeof WhiteLabelDomainSchema>;
export type WhiteLabelDomainsListResponse = ApiResponse<z.infer<typeof WhiteLabelDomainsDataSchema>>;
export type UpdateDomainStatusDto = z.infer<typeof UpdateDomainStatusSchema>;
export type UpdateDomainStatusResponse = ApiResponse<WhiteLabelDomain>;
export type SuperadminWhiteLabelingStatus = UpdateDomainStatusDto['status'];
