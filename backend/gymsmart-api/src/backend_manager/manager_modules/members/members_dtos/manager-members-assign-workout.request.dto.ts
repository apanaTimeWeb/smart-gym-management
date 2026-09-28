// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsString, IsUUID } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerMembersAssignWorkoutRequestDto extends CoreRequestDto {
  @IsString() @IsUUID() workoutId!: string;
}

export { ManagerMembersAssignWorkoutRequestDto as MembersAssignWorkoutRequestDto };
