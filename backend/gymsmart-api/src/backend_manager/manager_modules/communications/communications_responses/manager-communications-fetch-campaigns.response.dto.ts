// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { CommunicationsCampaignItemResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-campaign-item.response.dto';

export class ManagerCommunicationsFetchCampaignsResponseDto {
  @ApiProperty({ type: [CommunicationsCampaignItemResponseDto] })
  campaigns?: Array<CommunicationsCampaignItemResponseDto>;

}

export { ManagerCommunicationsFetchCampaignsResponseDto as CommunicationsFetchCampaignsResponseDto };
