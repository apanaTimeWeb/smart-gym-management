// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';
import { ManagerWorkoutFetchAssignmentsItemResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-fetch-assignments-item.response.dto';

export class ManagerWorkoutFetchAssignmentsResponseDto {
  @ApiProperty()
  assignedBy!: string;

  @ApiProperty({ type: [ManagerWorkoutFetchAssignmentsItemResponseDto] })
  data!: Array<ManagerWorkoutFetchAssignmentsItemResponseDto>;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  memberName!: string;

  @ApiProperty()
  planName!: string;

  @ApiProperty()
  startDate!: string;

}

export { ManagerWorkoutFetchAssignmentsResponseDto as WorkoutFetchAssignmentsResponseDto };
