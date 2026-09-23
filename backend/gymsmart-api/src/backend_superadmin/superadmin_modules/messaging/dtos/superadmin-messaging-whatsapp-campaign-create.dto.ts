// RESPONSIBILITY: Validates the exact frontend WhatsApp campaign create contract.
// FLOW: HTTP JSON -> SuperadminMessagingWhatsappCampaignCreateDto -> SuperadminMessagingWhatsappCampaignService -> SuperadminMessagingRepository.
import { ArrayMinSize, IsArray, IsString, IsUUID } from 'class-validator';

export class SuperadminMessagingWhatsappCampaignCreateDto {
  @IsString()
  name!: string;

  @IsString()
  audienceId!: string;

  @IsString()
  templateId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  recipientIds!: string[];
}