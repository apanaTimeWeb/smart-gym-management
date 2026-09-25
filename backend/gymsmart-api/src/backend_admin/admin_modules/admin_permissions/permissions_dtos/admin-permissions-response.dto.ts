// RESPONSIBILITY: Describes the frontend-consumed response fields for Admin permissions.
// FLOW: Repository domain â†’ Permissions response mapper â†’ ApiResponse<T>.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * @description Defines the AdminRolePermissionsDto boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminRolePermissionsDto {
  @ApiProperty({ enum: ['manager', 'trainer'] })
  role!: string;
  @ApiProperty({ type: Object, additionalProperties: { type: 'boolean' } })
  permissions!: Record<string, boolean>;
}

/**
 * @description Defines the AdminGymPermissionOverrideDto boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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

/**
 * @description Defines the AdminPermissionsDataDto boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPermissionsDataDto {
  @ApiProperty({ type: [AdminRolePermissionsDto] })
  roleDefaults!: AdminRolePermissionsDto[];
  @ApiProperty({ type: [AdminGymPermissionOverrideDto] })
  gymOverrides!: AdminGymPermissionOverrideDto[];
}
