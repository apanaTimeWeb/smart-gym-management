// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class WorkoutFetchWorkoutsResponseDto {
  @ApiProperty({ type: [Object] })
  workouts?: Array<{ days: number; duration: number; exercises: string; focus: string; level: string; name: string; tags?: Array<string>; }>;

}
