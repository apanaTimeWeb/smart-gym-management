import { z } from 'zod';
import { 
  WhiteLabelDomainSchema, 
  WhiteLabelDomainsListResponseSchema,
  UpdateDomainStatusSchema,
  UpdateDomainStatusResponseSchema
} from '../white-labeling_schemas/SuperadminWhiteLabelingSchemas';

export type WhiteLabelDomain = z.infer<typeof WhiteLabelDomainSchema>;
export type WhiteLabelDomainsListResponse = z.infer<typeof WhiteLabelDomainsListResponseSchema>;
export type UpdateDomainStatusDto = z.infer<typeof UpdateDomainStatusSchema>;
export type UpdateDomainStatusResponse = z.infer<typeof UpdateDomainStatusResponseSchema>;
