// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class ManagerMembersAssignWorkoutResponseDto {
  @ApiProperty({ type: Boolean })
  success!: boolean;

}

export { ManagerMembersAssignWorkoutResponseDto as MembersAssignWorkoutResponseDto };
