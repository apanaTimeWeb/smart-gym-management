// RESPONSIBILITY: Validates identifiers used by destructive or action endpoints.
// FLOW: HTTP body â†’ Id DTO â†’ command service â†’ named repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

/**
 * @description Defines the AdminDashboardIdDto boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardIdDto {
@ApiProperty() @IsUUID()
  id!: string;
}
