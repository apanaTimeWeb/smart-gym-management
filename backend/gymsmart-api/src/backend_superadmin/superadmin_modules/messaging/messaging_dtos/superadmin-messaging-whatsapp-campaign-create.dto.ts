import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Validates the exact frontend WhatsApp campaign create contract.
// FLOW: HTTP JSON -> SuperadminMessagingWhatsappCampaignCreateDto -> SuperadminMessagingWhatsappCampaignService -> SuperadminMessagingRepository.
import { ArrayMinSize, IsArray, IsString, IsUUID } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminMessagingWhatsappCampaignCreateDto as the class-level contract for superadmin-messaging-whatsapp-campaign-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingWhatsappCampaignCreateDto {
  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `name` data contract for this superadmin-messaging-whatsapp-campaign-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  name!: string;

  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `audienceId` data contract for this superadmin-messaging-whatsapp-campaign-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  audienceId!: string;

  @IsString()
  @ApiProperty()
  /** Primary Intent: Defines the `templateId` data contract for this superadmin-messaging-whatsapp-campaign-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  templateId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  @ApiProperty()
  /** Primary Intent: Defines the `recipientIds` data contract for this superadmin-messaging-whatsapp-campaign-create.dto construct.
 * Edge Cases: Validation/nullability/enum semantics follow the API contract. Side-Effects: None. AI-Note: Preserve exact field name and type. */
  recipientIds!: string[];
}
