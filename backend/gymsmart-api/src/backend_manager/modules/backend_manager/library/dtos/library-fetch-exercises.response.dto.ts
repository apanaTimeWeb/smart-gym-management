// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class LibraryFetchExercisesResponseDto {
  @ApiProperty({ type: [Object] })
  exercises?: Array<{ category: string; difficulty: string; isActive: number; muscleGroup: string; name: string; }>;

}
