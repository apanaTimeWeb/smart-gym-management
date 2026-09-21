// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin permissions.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain → Permissions response mapper → ApiResponse<T>.

export class AdminPermissionsResponseDto {
  id!: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: createdAt' })
  createdAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: updatedAt' })
  updatedAt?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: roleDefaults' })
  roleDefaults?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymOverrides' })
  gymOverrides?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: role' })
  role?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: permissions' })
  permissions?: string[];
  @ApiProperty({ required: false, description: 'Frontend contract field: gymId' })
  gymId?: number;
  @ApiProperty({ required: false, description: 'Frontend contract field: gymName' })
  gymName?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: overrides' })
  overrides?: Record<string, unknown>;
  @ApiProperty({ required: false, description: 'Frontend contract field: key' })
  key?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: label' })
  label?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: group' })
  group?: string;
  @ApiProperty({ required: false, description: 'Frontend contract field: description' })
  description?: string;
}
