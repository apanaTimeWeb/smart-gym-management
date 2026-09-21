// RESPONSIBILITY: Validates a plan identifier for GET body compatibility.
// FLOW: GET /admin/plans/fetchPlanById body/query → AdminPlansIdDto → query service.

import { IsOptional, IsUUID } from 'class-validator';

export class AdminPlansIdDto {
  @IsOptional()
  @IsUUID()
  id?: string;
}
