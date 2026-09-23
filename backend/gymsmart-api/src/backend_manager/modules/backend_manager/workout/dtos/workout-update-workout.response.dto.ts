// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class WorkoutUpdateWorkoutResponseDto {
  @ApiProperty()
  duration!: string;

  @ApiProperty({ type: Number })
  exercises!: number;

  @ApiProperty()
  focus!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  level!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  tags!: string[];

}
