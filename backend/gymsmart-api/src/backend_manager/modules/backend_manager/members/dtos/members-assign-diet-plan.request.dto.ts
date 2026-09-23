// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsString, IsUUID } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class MembersAssignDietPlanRequestDto extends CoreRequestDto {
  @IsString() @IsUUID() dietPlanId!: string;
}
