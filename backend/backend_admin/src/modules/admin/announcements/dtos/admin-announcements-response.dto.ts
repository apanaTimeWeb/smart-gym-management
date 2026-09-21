// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin announcements.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Announcements response mapper → ApiResponse<T>.

export class AdminAnnouncementsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: title' })
  title?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: body' })
  body?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: priority' })
  priority?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: status' })
  status?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: audience' })
  audience?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: gymIds' })
  gymIds?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: gymNames' })
  gymNames?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: publishedAt' })
  publishedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: expiresAt' })
  expiresAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdBy' })
  createdBy?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: viewCount' })
  viewCount?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: isPinned' })
  isPinned?: boolean;
  @ApiProperty({ required: false, description: 'Frontend contract field: deliveryStatus' })
  deliveryStatus?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: pushNotificationSent' })
  pushNotificationSent?: boolean;
  @ApiProperty({ required: false, description: 'Frontend contract field: acknowledgedCount' })
  acknowledgedCount?: number;
}
