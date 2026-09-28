// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerWorkoutWorkoutItemResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-workout-item.response.dto';

export class ManagerWorkoutFetchWorkoutsResponseDto {
  @ApiProperty({ type: [ManagerWorkoutWorkoutItemResponseDto] })
  workouts?: Array<ManagerWorkoutWorkoutItemResponseDto>;

}

export { ManagerWorkoutFetchWorkoutsResponseDto as WorkoutFetchWorkoutsResponseDto };
