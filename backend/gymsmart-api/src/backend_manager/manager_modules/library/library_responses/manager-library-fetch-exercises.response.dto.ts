// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerLibraryExerciseItemResponseDto } from '@/backend_manager/manager_modules/library/library_responses/manager-library-exercise-item.response.dto';

export class ManagerLibraryFetchExercisesResponseDto {
  @ApiProperty({ type: [ManagerLibraryExerciseItemResponseDto] })
  exercises?: Array<ManagerLibraryExerciseItemResponseDto>;

}

export { ManagerLibraryFetchExercisesResponseDto as LibraryFetchExercisesResponseDto };
