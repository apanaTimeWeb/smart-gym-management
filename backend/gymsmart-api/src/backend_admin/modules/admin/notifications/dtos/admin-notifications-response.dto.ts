// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin notifications.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// FLOW: Repository domain â†’ Notifications response mapper â†’ ApiResponse<T>.

export class AdminNotificationDto {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  body!: string;
  @ApiProperty({ enum: ['INFO', 'WARNING', 'CRITICAL'] })
  severity!: string;
  @ApiProperty()
  read!: boolean;
  @ApiProperty()
  createdAt!: string;
  @ApiPropertyOptional()
  branchId?: string;
  @ApiPropertyOptional()
  branchName?: string;
}
