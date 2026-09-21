// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin campaigns.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Campaigns response mapper → ApiResponse<T>.

export class AdminCampaignsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: name' })
  name?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: description' })
  description?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: title' })
  title?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: body' })
  body?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: type' })
  type?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: recipients' })
  recipients?: string[];
}
