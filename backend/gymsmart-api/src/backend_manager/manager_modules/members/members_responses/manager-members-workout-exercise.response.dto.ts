// RESPONSIBILITY: Defines one exercise inside a Manager member workout snapshot.
// FLOW: Workout plan snapshot -> typed exercise -> workout-day response.
import { ApiProperty } from '@nestjs/swagger';
export class ManagerMembersWorkoutExerciseResponseDto { @ApiProperty() name!: string; @ApiProperty() sets!: number; @ApiProperty() reps!: number; @ApiProperty({ required: false }) notes?: string; }

export { ManagerMembersWorkoutExerciseResponseDto as MembersWorkoutExerciseResponseDto };
