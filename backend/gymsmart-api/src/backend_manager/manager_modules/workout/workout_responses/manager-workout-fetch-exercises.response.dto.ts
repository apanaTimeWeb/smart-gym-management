// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerWorkoutExerciseItemResponseDto } from '@/backend_manager/manager_modules/workout/workout_responses/manager-workout-exercise-item.response.dto';

export class ManagerWorkoutFetchExercisesResponseDto {
  @ApiProperty({ type: [ManagerWorkoutExerciseItemResponseDto] })
  exercises?: Array<ManagerWorkoutExerciseItemResponseDto>;

}

export { ManagerWorkoutFetchExercisesResponseDto as WorkoutFetchExercisesResponseDto };
