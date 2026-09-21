// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin settings.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Settings response mapper → ApiResponse<T>.

export class AdminSettingsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: profile' })
  profile?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: notifications' })
  notifications?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: integration' })
  integration?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: gst' })
  gst?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: payment' })
  payment?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: general' })
  general?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: twoFactorEnabled' })
  twoFactorEnabled?: boolean;
}
