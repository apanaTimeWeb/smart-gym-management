import { apiFetch } from '@/lib/api';
import { SuperadminWhiteLabelingUrlConfig } from './superadmin_white_labeling_url_config';
import { 
  WhiteLabelDomainsListResponseSchema, 
  UpdateDomainStatusResponseSchema 
} from '../white-labeling_schemas/SuperadminWhiteLabelingSchemas';
import type { 
  WhiteLabelDomainsListResponse, 
  UpdateDomainStatusDto, 
  UpdateDomainStatusResponse 
} from '../white-labeling_types/SuperadminWhiteLabelingTypes';

export const SuperadminWhiteLabelingApi = {
  getDomains: async (): Promise<WhiteLabelDomainsListResponse> => {
    return apiFetch<WhiteLabelDomainsListResponse>(
      SuperadminWhiteLabelingUrlConfig.API.DOMAINS,
      { 
        method: 'GET',
        responseSchema: WhiteLabelDomainsListResponseSchema
      }
    );
  },

  updateDomainStatus: async (id: string, dto: UpdateDomainStatusDto): Promise<UpdateDomainStatusResponse> => {
    return apiFetch<UpdateDomainStatusResponse>(
      SuperadminWhiteLabelingUrlConfig.API.UPDATE_STATUS(id),
      {
        method: 'PATCH',
        body: JSON.stringify(dto),
        responseSchema: UpdateDomainStatusResponseSchema
      }
    );
  },
};
