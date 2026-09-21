// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin notifications.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Notifications response mapper → ApiResponse<T>.

export class AdminNotificationsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: title' })
  title?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: body' })
  body?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: severity' })
  severity?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: read' })
  read?: boolean;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchId' })
  branchId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: branchName' })
  branchName?: string;
}
