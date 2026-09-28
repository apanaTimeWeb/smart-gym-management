// RESPONSIBILITY: Defines one workout day inside a Manager member workout snapshot.
// FLOW: Workout plan snapshot -> day/focus/exercises -> workout response.
import { ApiProperty } from '@nestjs/swagger';
import { MembersWorkoutExerciseResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-workout-exercise.response.dto';
export class ManagerMembersWorkoutDayResponseDto { @ApiProperty() day!: number | string; @ApiProperty() focus!: string; @ApiProperty({ type: [MembersWorkoutExerciseResponseDto] }) exercises!: MembersWorkoutExerciseResponseDto[]; }

export { ManagerMembersWorkoutDayResponseDto as MembersWorkoutDayResponseDto };
