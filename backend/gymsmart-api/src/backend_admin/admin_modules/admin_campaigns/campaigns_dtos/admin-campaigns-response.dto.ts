// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin campaigns.
// FLOW: Repository domain â†’ Campaigns response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * @description Defines the AdminCampaignsAudienceDto boundary for the admin_campaigns backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCampaignsAudienceDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  description!: string;
}

/**
 * @description Defines the AdminCampaignsTemplateDto boundary for the admin_campaigns backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCampaignsTemplateDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  body!: string;
  @ApiProperty({ enum: ['FEE_REMINDER', 'OVERDUE', 'RENEWAL', 'CUSTOM'] })
  type!: string;
}

/**
 * @description Defines the AdminCampaignsRecipientDto boundary for the admin_campaigns backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCampaignsRecipientDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  phone!: string;
  @ApiProperty()
  branchName!: string;
}

/**
 * @description Defines the AdminCampaignsRecipientsDataDto boundary for the admin_campaigns backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCampaignsRecipientsDataDto {
  @ApiProperty({ type: [AdminCampaignsRecipientDto] })
  recipients!: AdminCampaignsRecipientDto[];
}

