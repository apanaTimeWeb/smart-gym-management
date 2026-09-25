// RESPONSIBILITY: Validates a plan identifier for GET body compatibility.
// FLOW: GET /admin/plans/fetchPlanById body/query â†’ AdminPlansIdDto â†’ query service.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsUUID } from 'class-validator';

/**
 * @description Defines the AdminPlansIdDto boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansIdDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;
}
