// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin campaigns.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Campaigns response mapper → ApiResponse<T>.

export class AdminCampaignsAudienceDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  name!: string;
  @ApiProperty()
  description!: string;
}

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

export class AdminCampaignsAudiencesResponseDto {
  @ApiProperty({ type: [AdminCampaignsAudienceDto] })
  data!: AdminCampaignsAudienceDto[];
}

export class AdminCampaignsTemplatesResponseDto {
  @ApiProperty({ type: [AdminCampaignsTemplateDto] })
  data!: AdminCampaignsTemplateDto[];
}

export class AdminCampaignsRecipientsDataDto {
  @ApiProperty({ type: [AdminCampaignsRecipientDto] })
  recipients!: AdminCampaignsRecipientDto[];
}

export class AdminCampaignsRecipientsResponseDto {
  @ApiProperty({ type: AdminCampaignsRecipientsDataDto })
  data!: AdminCampaignsRecipientsDataDto;
}
