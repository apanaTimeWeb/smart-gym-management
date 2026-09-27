// RESPONSIBILITY: Defines the typed single-campaign response for Manager campaign creation/queueing.
// FLOW: Created campaign projection -> typed campaign DTO -> canonical ApiResponse envelope.
import { CommunicationsCampaignItemResponseDto } from '@/backend_manager/manager_modules/communications/communications_responses/manager-communications-campaign-item.response.dto';
export class ManagerCommunicationsSendCampaignResponseDto extends CommunicationsCampaignItemResponseDto {}

export { ManagerCommunicationsSendCampaignResponseDto as CommunicationsSendCampaignResponseDto };
