// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin permissions.
import { ApiProperty } from '@nestjs/swagger';

// FLOW: Repository domain â†’ Permissions response mapper â†’ ApiResponse<T>.

export class AdminRolePermissionsDto {
  @ApiProperty({ enum: ['manager', 'trainer'] })
  role!: string;
  @ApiProperty({ type: Object, additionalProperties: { type: 'boolean' } })
  permissions!: Record<string, boolean>;
}

export class AdminGymPermissionOverrideDto {
  @ApiProperty()
  gymId!: string;
  @ApiProperty()
  gymName!: string;
  @ApiProperty({ enum: ['manager', 'trainer'] })
  role!: string;
  @ApiProperty({ type: Object, additionalProperties: { type: 'boolean' } })
  overrides!: Record<string, boolean>;
}

export class AdminPermissionsDataDto {
  @ApiProperty({ type: [AdminRolePermissionsDto] })
  roleDefaults!: AdminRolePermissionsDto[];
  @ApiProperty({ type: [AdminGymPermissionOverrideDto] })
  gymOverrides!: AdminGymPermissionOverrideDto[];
}
